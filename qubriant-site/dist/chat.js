(() => {
  const panel=document.querySelector('#ai-chat-panel'),launcher=document.querySelector('.ai-chat-launcher');
  if(!panel || !launcher) return;
  const input=panel.querySelector('textarea'),form=panel.querySelector('form'),log=panel.querySelector('.ai-chat-messages'),status=panel.querySelector('.ai-chat-status'),retry=panel.querySelector('.ai-chat-retry'),prompts=panel.querySelector('.ai-chat-prompts');
  const welcome=log.firstElementChild.cloneNode(true);
  let history=[],pending=false,failed=null,controller=null,version=0;
  function show(open){panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));if(open)input.focus();else launcher.focus();}
  launcher.addEventListener('click',()=>show(panel.hidden));
  panel.querySelector('.ai-chat-close').addEventListener('click',()=>show(false));
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();show(false);}});
  function bubble(text,role){const item=document.createElement('div');item.className=`ai-message ${role}`;item.textContent=text;log.append(item);log.scrollTop=log.scrollHeight;}
  function busy(value){pending=value;form.querySelector('button').disabled=value;input.disabled=value;prompts.querySelectorAll('button').forEach(b=>b.disabled=value);log.setAttribute('aria-busy',String(value));}
  async function send(message,isRetry=false){
    if(pending || !message.trim())return;
    message=message.trim().slice(0,2000);
    if(failed && !isRetry)history.pop();
    if(!isRetry){bubble(message,'user');history.push({role:'user',content:message});}
    failed=null;retry.hidden=true;prompts.hidden=true;input.value='';status.textContent='Thinking…';busy(true);
    const current=version;controller=new AbortController();const timeout=setTimeout(()=>controller?.abort(),50000);
    try{
      let messages=history.slice(-11);
      while(messages.reduce((n,m)=>n+m.content.length,0)>12000 && messages.length>1)messages=messages.slice(2);
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages}),signal:controller.signal});
      let data;try{data=await response.json();}catch{throw new Error('Chat is unavailable on this host. Please use the team link below.');}
      if(!response.ok)throw new Error(data.error || 'Could not send your message. Please try again.');
      if(typeof data.reply!=='string' || !data.reply.trim())throw new Error('No reply arrived. Please try again.');
      if(current!==version)return;
      // Plain text avoids executing markup from either visitors or model output.
      bubble(data.reply,'assistant');history.push({role:'assistant',content:data.reply.slice(0,2000)});status.textContent='';
    }catch(error){if(current!==version)return;failed=message;status.textContent=error.name==='AbortError'?'The reply timed out. Please try again.':error.message;retry.hidden=false;}
    finally{clearTimeout(timeout);if(current===version){busy(false);if(!panel.hidden)input.focus();}}
  }
  form.addEventListener('submit',event=>{event.preventDefault();send(input.value);});
  input.addEventListener('keydown',event=>{if(event.key==='Enter' && !event.shiftKey && !event.isComposing){event.preventDefault();form.requestSubmit();}});
  prompts.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>send(button.textContent)));
  retry.addEventListener('click',()=>{if(failed)send(failed,true);});
  panel.querySelector('.ai-chat-clear').addEventListener('click',()=>{version++;controller?.abort();history=[];failed=null;busy(false);input.value='';status.textContent='';retry.hidden=true;prompts.hidden=false;log.replaceChildren(welcome.cloneNode(true));input.focus();});
})();
