const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.jpg':'image/jpeg' };
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if(p==='/') p='/index.html';
  const f = path.join(root, p);
  if(!f.startsWith(root)){ res.writeHead(403); res.end(); return; }
  fs.readFile(f,(e,d)=>{
    if(e){ res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, {'Content-Type': types[path.extname(f)]||'text/plain'});
    res.end(d);
  });
}).listen(8124, ()=>console.log('serving '+root+' on 8124'));
