import { readFile, readdir, access } from 'node:fs/promises';
import { strict as assert } from 'node:assert';
import path from 'node:path';
const root=path.resolve('dist');
const files=(await readdir(root)).filter(f=>f.endsWith('.html'));
const missing=new Set();
let localLinks=0, images=0;
for(const file of files){
  const html=await readFile(path.join(root,file),'utf8');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: one main heading`);
  assert.ok(html.includes('<meta name="viewport"'),`${file}: mobile viewport`);
  assert.ok(html.includes('class="cookie-notice"'),`${file}: necessary-storage notice`);
  assert.ok(html.includes('class="cookie-accept"'),`${file}: consent action`);
  assert.doesNotMatch(html,/(?:googletagmanager\.com|google-analytics\.com|connect\.facebook\.net)/i,`${file}: no third-party trackers`);
  for(const match of html.matchAll(/<(?:img|script|source|link|a|video)\b[^>]*?(?:src|href|srcset|poster)="([^"\s]+)"/g)){
    const url=match[1].split('#')[0];
    if(!url || /^(?:https?:|mailto:|tel:|data:)/.test(url))continue;
    localLinks++;
    try{await access(path.join(root,decodeURIComponent(url)));}
    catch{missing.add(`${file}: ${url}`);}
  }
  for(const match of html.matchAll(/<img\b[^>]*>/g)){
    images++;
    assert.ok(/\balt="[^"]*"/.test(match[0]),`${file}: image alt attribute`);
  }
  for(const match of html.matchAll(/<select\b[^>]*>([\s\S]*?)<\/select>/g)){
    assert.ok((match[1].match(/<option\b/g)||[]).length>1,`${file}: usable select options`);
  }
}
assert.equal(missing.size,0,`Missing local references:\n${[...missing].join('\n')}`);
console.log(`Checked ${files.length} pages, ${localLinks} local references, ${images} image descriptions, and form options. All passed.`);
