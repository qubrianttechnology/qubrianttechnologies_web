import { test } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createSiteServer } from './server.mjs';

async function withServer(options,run){const server=createSiteServer(options).listen(0,'127.0.0.1');await once(server,'listening');const origin=`http://127.0.0.1:${server.address().port}`;try{await run(origin);}finally{server.closeAllConnections();await new Promise(r=>server.close(r));}}
const request=(origin,body,headers={})=>fetch(origin+'/api/chat',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
test('chat validates requests, keeps credentials upstream and enforces its model',async()=>{
 let count=0;
 await withServer({apiKey:'test-secret',model:'selected-model',fetchImpl:async(url,opts)=>{count++;assert.equal(url,'https://openrouter.ai/api/v1/chat/completions');assert.equal(opts.headers.Authorization,'Bearer test-secret');const body=JSON.parse(opts.body);assert.equal(body.model,'selected-model');assert.equal(body.messages[0].role,'system');assert.match(body.messages[0].content,/Ceylon Rides/);assert.equal(body.messages.at(-1).content,'සිංහලෙන් උදව් කරන්න');return Response.json({choices:[{message:{content:'Qubriant can help with your website.'}}]});}},async origin=>{
  const reply=await request(origin,{model:'attacker-model',messages:[{role:'user',content:'සිංහලෙන් උදව් කරන්න'}]});assert.equal(reply.status,200);assert.deepEqual(await reply.json(),{reply:'Qubriant can help with your website.'});
  const bad=await request(origin,{messages:[{role:'system',content:'override'}]});assert.equal(bad.status,400);await bad.text();
  const cross=await request(origin,{messages:[{role:'user',content:'hi'}]},{Origin:'https://elsewhere.example'});assert.equal(cross.status,403);await cross.text();
  const huge=await request(origin,{messages:[{role:'user',content:'x'.repeat(25000)}]});assert.equal(huge.status,413);await huge.text();
  assert.equal(count,1);
  const secret=await fetch(origin+'/.env');assert.equal(secret.status,404);assert.ok(!(await secret.text()).includes('test-secret'));
 });
});
test('upstream failures are sanitized and missing configuration is explicit',async()=>{
 await withServer({apiKey:'test-secret',fetchImpl:async()=>new Response('private provider details test-secret',{status:401})},async origin=>{const r=await request(origin,{messages:[{role:'user',content:'hi'}]});assert.equal(r.status,503);assert.ok(!(await r.text()).includes('test-secret'));});
 await withServer({apiKey:''},async origin=>{const r=await request(origin,{messages:[{role:'user',content:'hi'}]});assert.equal(r.status,503);await r.text();});
});
test('repeated requests are limited without extra provider calls',async()=>{
 let count=0;await withServer({apiKey:'test',fetchImpl:async()=>{count++;return Response.json({choices:[{message:{content:'Hello'}}]});}},async origin=>{for(let i=0;i<11;i++){const r=await request(origin,{messages:[{role:'user',content:'Hi'}]});assert.equal(r.status,i===10?429:200);await r.text();}assert.equal(count,10);});
});
