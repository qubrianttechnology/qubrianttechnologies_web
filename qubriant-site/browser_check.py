"""Browser smoke checks using the locally installed Chrome and its DevTools API."""
from pathlib import Path
import subprocess, time, urllib.request, json, base64, sys
import websocket

ROOT=Path(__file__).resolve().parent
QA=ROOT/'qa'
QA.mkdir(exist_ok=True)
PORT=9333
chrome=Path('C:/Program Files/Google/Chrome/Application/chrome.exe')
proc=subprocess.Popen([str(chrome),'--headless=new','--disable-gpu','--run-all-compositor-stages-before-draw',f'--remote-debugging-port={PORT}','--remote-allow-origins=http://localhost',f'--user-data-dir={QA / "chrome-profile"}','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-component-update','about:blank'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,creationflags=subprocess.CREATE_NO_WINDOW)

def get_json(url):
    return json.load(urllib.request.urlopen(url,timeout=3))

try:
    for _ in range(40):
        try:
            tabs=get_json(f'http://127.0.0.1:{PORT}/json');break
        except Exception:time.sleep(.25)
    else:raise RuntimeError('Chrome debugging endpoint did not start')
    tab=next(tab for tab in tabs if tab['type']=='page')
    ws=websocket.create_connection(tab['webSocketDebuggerUrl'],origin='http://localhost',timeout=60)
    seq=0
    errors=[]
    def call(method,params=None):
        global seq
        seq+=1;current=seq
        ws.send(json.dumps({'id':current,'method':method,'params':params or {}}))
        while True:
            msg=json.loads(ws.recv())
            if msg.get('method')=='Runtime.exceptionThrown':errors.append(msg['params'])
            if msg.get('id')==current:
                if 'error' in msg:raise RuntimeError(msg['error'])
                return msg.get('result',{})
    def evaluate(expr):
        result=call('Runtime.evaluate',{'expression':expr,'returnByValue':True,'awaitPromise':True})
        if result.get('exceptionDetails'):raise RuntimeError(result['exceptionDetails'])
        return result.get('result',{}).get('value')
    def navigate(path):
        print('Checking',path,flush=True)
        call('Page.navigate',{'url':'http://127.0.0.1:4173/'+path})
        time.sleep(.8)
        evaluate('document.fonts.ready.then(()=>true)')
    def viewport(width,height):
        call('Emulation.setDeviceMetricsOverride',{'width':width,'height':height,'deviceScaleFactor':1,'mobile':width<600})
    def screenshot(name,full=False):
        print('Screenshot',name,flush=True)
        args={'format':'png','captureBeyondViewport':full}
        if full:
            size=call('Page.getLayoutMetrics')['cssContentSize']
            args['clip']={'x':0,'y':0,'width':size['width'],'height':min(size['height'],18000),'scale':1}
        data=call('Page.captureScreenshot',args)['data']
        (QA/name).write_bytes(base64.b64decode(data))
    def audit():
        return evaluate("""({title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),h1:document.querySelectorAll('h1').length})""")
    call('Page.enable');call('Runtime.enable')
    if '--chat-layout' in sys.argv:
        for width in [1440,390]:
            viewport(width,844);navigate('index.html')
            assert evaluate("document.querySelector('.ai-chat-launcher').getBoundingClientRect().left<30")
            assert evaluate("document.querySelector('.floating-chat').getBoundingClientRect().right>innerWidth-50")
            evaluate("document.querySelector('.ai-chat-launcher').click();document.documentElement.dataset.theme='dark'")
            assert evaluate("(()=>{const b=document.querySelector('.ai-chat-close'),r=b.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)===b})()")
            assert not audit()['overflow']
            screenshot('chat-left-'+str(width)+'.png')
        print('Bot is on the left, WhatsApp is on the right; chat opens correctly on desktop and mobile.')
        ws.close();sys.exit(0)
    if '--chat' in sys.argv:
        viewport(1440,1000);navigate('index.html')
        evaluate("document.querySelector('.ai-chat-launcher').click()")
        assert evaluate("document.activeElement.id")=='ai-chat-input'
        evaluate("document.querySelector('#ai-chat-input').value='Name two Qubriant projects in one short sentence.';document.querySelector('.ai-chat-form').requestSubmit()")
        for _ in range(55):
            if evaluate("!document.querySelector('.ai-chat-form button').disabled"):break
            time.sleep(1)
        assert evaluate("document.querySelectorAll('.ai-message.assistant').length")==2
        assert evaluate("document.querySelector('.ai-chat-status').textContent")==''
        screenshot('chat-desktop.png')
        evaluate("document.querySelector('.ai-chat-clear').click();window.originalChatFetch=window.fetch;window.fetch=async()=>new Response(JSON.stringify({error:'Test temporary outage'}),{status:503,headers:{'Content-Type':'application/json'}});document.querySelector('#ai-chat-input').value='test';document.querySelector('.ai-chat-form').requestSubmit()")
        time.sleep(.4)
        assert evaluate("!document.querySelector('.ai-chat-retry').hidden")
        evaluate("window.fetch=async()=>new Response(JSON.stringify({reply:'<img src=x onerror=alert(1)> Safe text'}),{headers:{'Content-Type':'application/json'}});document.querySelector('.ai-chat-retry').click()")
        time.sleep(.4)
        assert evaluate("document.querySelectorAll('.ai-chat-messages img').length")==0
        assert evaluate("document.querySelectorAll('.ai-message.user').length")==1
        evaluate("window.fetch=window.originalChatFetch;document.querySelector('.ai-chat-clear').click()")
        assert evaluate("document.querySelectorAll('.ai-message').length")==1
        viewport(390,844)
        assert not audit()['overflow']
        assert evaluate("document.querySelector('#ai-chat-panel').getBoundingClientRect().bottom<=innerHeight")
        screenshot('chat-mobile.png')
        evaluate("document.documentElement.dataset.theme='dark'")
        screenshot('chat-mobile-dark.png')
        evaluate("document.querySelector('#ai-chat-input').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))")
        assert evaluate("document.querySelector('#ai-chat-panel').hidden")
        assert evaluate("document.activeElement.classList.contains('ai-chat-launcher')")
        assert not errors
        print('Live chat, safe text rendering, retry, reset, keyboard focus and mobile/dark layouts passed.')
        ws.close();sys.exit(0)
    if '--sections' in sys.argv:
        for width in [1440,390]:
            viewport(width,1000);navigate('index.html')
            evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-visible'));document.documentElement.style.scrollBehavior='auto'")
            for section in ['technology','contact','reviews']:
                evaluate("document.getElementById('"+section+"').scrollIntoView({behavior:'instant'})")
                time.sleep(.5)
                screenshot(section+'-'+str(width)+'.png')
                assert not audit()['overflow'],section
            assert evaluate("document.querySelector('#reviews .btn').href")== 'https://share.google/oACFFEw17A396cywm'
            assert evaluate("document.querySelectorAll('#technology .tech-card').length")==6
        assert not errors
        print('Technology, contact and Google profile sections passed desktop/mobile checks.')
        ws.close();sys.exit(0)
    if '--services' in sys.argv:
        for width in [1440,768,390]:
            viewport(width,1000);navigate('index.html')
            evaluate("Promise.all([...document.querySelectorAll('.service-visual img')].map(i=>{i.loading='eager';return i.decode()}))")
            assert evaluate("document.querySelectorAll('.service-visual img').length")==6
            evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-visible'));document.querySelector('.services-section').scrollIntoView()")
            time.sleep(.5)
            assert not audit()['overflow']
            screenshot('services-'+str(width)+'.png')
        assert not errors
        print('All six service images decoded; desktop, tablet and mobile layouts passed.')
        ws.close()
        sys.exit(0)
    if '--form' in sys.argv:
        viewport(1440,1000);navigate('contact.html')
        print(evaluate("""(()=>{const f=document.querySelector('#contact-form');f.elements.namedItem('name').value='QA Test';f.elements.namedItem('email').value='qa@example.com';f.elements.namedItem('type').value='Custom software';f.elements.namedItem('details').value='A sample local enquiry for validation.';const valid=f.checkValidity();f.requestSubmit();return {valid,fields:[...f.elements].map(e=>({name:e.name,value:e.value,valid:e.validity?.valid})),status:f.querySelector('.form-status').outerHTML}})()"""),flush=True)
        print(errors,flush=True)
        sys.exit(0)
    results=[]
    viewport(1440,1000);navigate('index.html');time.sleep(1)
    assert evaluate("document.querySelectorAll('.header-socials .social-placeholder').length")==10
    assert evaluate("document.querySelector('.hero-video').play().then(()=>true).catch(()=>false)")
    assert evaluate("document.querySelector('.hero-video').muted && document.querySelector('.hero-video').loop")
    assert evaluate("document.querySelector('.hero-video-toggle')===null")
    screenshot('home-desktop.png')
    evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-visible'))")
    evaluate("Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))")
    screenshot('home-desktop-full.png',True)
    results.append(audit())
    evaluate("document.querySelectorAll('.industry-panel')[2].click()")
    assert evaluate("document.querySelector('#industry-title').textContent")== 'E-Commerce & Retail'
    evaluate("document.querySelector('.nav-quote').click()")
    assert evaluate("document.querySelector('#quote-dialog').open")
    evaluate("document.querySelector('.dialog-close').click()")
    assert not evaluate("document.querySelector('#quote-dialog').open")
    evaluate("document.querySelector('.theme-toggle').click()")
    assert evaluate("document.documentElement.dataset.theme")=='dark'
    screenshot('home-dark.png')
    evaluate("document.querySelector('.theme-toggle').click()")
    viewport(390,844);navigate('index.html');time.sleep(.7)
    screenshot('home-mobile.png')
    results.append(audit())
    evaluate("document.querySelector('.menu-toggle').click()")
    assert evaluate("!document.querySelector('#mobile-menu').hidden")
    screenshot('mobile-menu.png')
    evaluate("document.querySelector('.menu-toggle').click()")
    assert evaluate("document.querySelector('#mobile-menu').hidden")
    evaluate("document.querySelectorAll('.industry-panel')[4].click()")
    assert evaluate("document.querySelector('#industry-title').textContent")=='Education & EdTech'
    evaluate("document.querySelectorAll('.reveal').forEach(e=>e.classList.add('is-visible'))")
    evaluate("Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))")
    screenshot('home-mobile-full.png',True)
    for width in [320,768,1024]:
        viewport(width,900);navigate('index.html');results.append(audit())
    viewport(1440,1000)
    for route in ['services.html','industries.html','products.html','portfolio.html','about.html','insights.html','contact.html','team.html','technologies.html','warranty.html','project-ceylon-rides.html','project-mma-colombo.html','project-fighter-insider.html','project-sri-lanka-mma.html','service-ai-automation.html','industry-healthcare.html','insight-planning-your-software-project.html']:
        navigate(route);results.append(audit())
    navigate('portfolio.html')
    evaluate("document.querySelector('[data-project-filter=\"Travel & Hospitality\"]').click()")
    assert evaluate("document.querySelectorAll('#project-grid .project-card:not([hidden])').length")==1
    navigate('insights.html')
    evaluate("document.querySelector('#article-search').value='automation';document.querySelector('#article-search').dispatchEvent(new Event('input'))")
    assert evaluate("document.querySelectorAll('.article-card:not([hidden])').length")==1
    evaluate("document.querySelector('#article-search').value='no-such-article-123';document.querySelector('#article-search').dispatchEvent(new Event('input'))")
    assert evaluate("!document.querySelector('.empty-search').hidden")
    navigate('contact.html')
    evaluate("""(()=>{const f=document.querySelector('#contact-form'); f.elements.name.value='QA Test'; f.elements.email.value='qa@example.com'; f.elements.type.value='Custom software'; f.elements.details.value='A sample local enquiry for validation.';f.requestSubmit();})()""")
    assert evaluate("!document.querySelector('#contact-form .form-status').hidden")
    assert evaluate("document.querySelector('#contact-form .form-status a').href.startsWith('mailto:info@qubriant.com')")
    for route in ['services.html','industries.html','products.html','portfolio.html','about.html','insights.html','contact.html']:
        viewport(390,844);navigate(route);results.append(audit())
    call('Emulation.setEmulatedMedia',{'features':[{'name':'prefers-reduced-motion','value':'reduce'}]})
    navigate('index.html')
    assert evaluate("document.querySelector('.hero-video').paused")
    assert evaluate("getComputedStyle(document.querySelector('.ticker-track')).animationName")=='none'
    assert evaluate("getComputedStyle(document.querySelector('.reveal')).opacity")=='1'
    report={'pages':results,'runtimeErrors':errors,'interactions':'industry switching, mobile menu, quote dialog, light/dark theme, portfolio filters, article search, empty state, enquiry draft, reduced motion passed'}
    (QA/'report.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps(report,indent=2))
    assert not errors, 'Browser runtime errors were found'
    assert all(not page['overflow'] and not page['brokenImages'] for page in results), 'Layout or image errors were found'
    ws.close()
finally:
    proc.terminate()
    try:proc.wait(timeout=5)
    except subprocess.TimeoutExpired:proc.kill()
