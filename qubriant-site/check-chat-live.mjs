// One intentional provider request, using the server-only local configuration.
import { createSiteServer } from './server.mjs';
import { once } from 'node:events';
const server=createSiteServer().listen(0,'127.0.0.1');await once(server,'listening');
const origin=`http://127.0.0.1:${server.address().port}`;
try{
 const response=await fetch(origin+'/api/chat',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:'In one short sentence, name two services Qubriant offers.'}]})});
 const data=await response.json();console.log(JSON.stringify({status:response.status,reply:data.reply,error:data.error}));if(!response.ok)process.exitCode=1;
}finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
