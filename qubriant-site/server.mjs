import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createChatHandler } from './chat.mjs';

try { process.loadEnvFile(fileURLToPath(new URL('./.env', import.meta.url))); }
catch (error) { if (error.code !== 'ENOENT') throw error; }

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };

export function createSiteServer(chatOptions) {
  const chat = createChatHandler(chatOptions);
  const chatConfigured = Boolean(chatOptions?.apiKey ?? process.env.OPENROUTER_API_KEY);
  return http.createServer(async (req, res) => {
    const route = req.url?.split('?')[0];
    if (route === '/api/chat') return chat(req, res);
    if (route === '/api/health') {
      if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Allow: 'GET' });
        return res.end(JSON.stringify({ error: 'Use GET for health checks.' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      return res.end(JSON.stringify({ status: 'ok', chat: { configured: chatConfigured } }));
    }
    const reply = (status, message, headers = {}) => {
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
      res.end(req.method === 'HEAD' ? undefined : message);
    };
    if (!['GET', 'HEAD'].includes(req.method)) return reply(405, 'Method not allowed', { Allow: 'GET, HEAD' });
    let filename;
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname.includes('\0') || pathname.includes('\\')) return reply(400, 'Invalid path');
      filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!filename.startsWith(root)) return reply(403, 'Forbidden');
    } catch { return reply(400, 'Invalid URL'); }

    let info;
    let status = 200;
    try {
      info = await stat(filename);
      if (!info.isFile()) throw new Error('Not a file');
    } catch {
      status = 404;
      filename = path.join(root, '404.html');
      try { info = await stat(filename); }
      catch { return reply(404, 'Not found'); }
    }
    const headers = { 'Content-Type': mime[path.extname(filename).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'Accept-Ranges': 'bytes', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'SAMEORIGIN', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()' };
    let start = 0;
    let end = info.size - 1;
    // Browsers use byte ranges to load and loop the MP4 background.
    if (req.headers.range && status === 200) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!range || (!range[1] && !range[2])) return reply(416, 'Invalid range', { 'Content-Range': `bytes */${info.size}` });
      start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
      end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size) return reply(416, 'Range not satisfiable', { 'Content-Range': `bytes */${info.size}` });
      status = 206;
      headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
    }
    headers['Content-Length'] = info.size ? end - start + 1 : 0;
    res.writeHead(status, headers);
    if (req.method === 'HEAD' || !info.size) return res.end();
    const stream = createReadStream(filename, { start, end });
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('PORT must be a number between 1 and 65535.');
    process.exitCode = 1;
  } else {
    const server = createSiteServer();
    server.on('error', error => {
      console.error(error.code === 'EADDRINUSE'
        ? `Port ${port} is already in use. Open http://127.0.0.1:${port} if this site is running, or stop the earlier server before restarting.`
        : `Could not start the site: ${error.message}`);
      process.exitCode = 1;
    });
    server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Qubriant Technologies — http://127.0.0.1:${port}`));
  }
}
