import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createSiteServer } from './server.mjs';

let server, origin;
before(async () => {
  server = createSiteServer().listen(0, '127.0.0.1');
  await once(server, 'listening');
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));

test('serves the retained homepage and missing-page response', async () => {
  const page = await fetch(origin);
  assert.equal(page.status, 200);
  const html = await page.text();
  assert.match(html, /Intelligent software/);
  assert.match(html, /qubriant-home-background.mp4/);
  assert.equal((html.split('</header>')[0].match(/class="social-placeholder"/g) || []).length, 10);
  const missing = await fetch(`${origin}/missing.html`);
  assert.equal(missing.status, 404);
  await missing.text();
});
test('reports server and chatbot readiness without exposing configuration', async () => {
  const health = await fetch(`${origin}/api/health`);
  assert.equal(health.status, 200);
  assert.equal(health.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await health.json(), { status: 'ok', chat: { configured: Boolean(process.env.OPENROUTER_API_KEY) } });
  const wrongMethod = await fetch(`${origin}/api/health`, { method: 'POST' });
  assert.equal(wrongMethod.status, 405);
  await wrongMethod.text();
  const unconfiguredServer = createSiteServer({ apiKey: '' }).listen(0, '127.0.0.1');
  await once(unconfiguredServer, 'listening');
  try {
    const unconfigured = await fetch(`http://127.0.0.1:${unconfiguredServer.address().port}/api/health`);
    assert.deepEqual(await unconfigured.json(), { status: 'ok', chat: { configured: false } });
  } finally {
    unconfiguredServer.closeAllConnections();
    await new Promise(resolve => unconfiguredServer.close(resolve));
  }
  const page = await fetch(origin);
  assert.equal(page.headers.get('x-frame-options'), 'SAMEORIGIN');
  assert.equal(page.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  await page.text();
});
test('streams MP4 byte ranges and handles HEAD requests', async () => {
  const url = `${origin}/assets/qubriant-home-background.mp4`;
  const head = await fetch(url, { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(head.headers.get('content-type'), 'video/mp4');
  const size = Number(head.headers.get('content-length'));
  assert.ok(size > 0);
  const part = await fetch(url, { headers: { Range: 'bytes=0-1023' } });
  assert.equal(part.status, 206);
  assert.equal(part.headers.get('content-range'), `bytes 0-1023/${size}`);
  assert.equal((await part.arrayBuffer()).byteLength, 1024);
  const suffix = await fetch(url, { headers: { Range: 'bytes=-32' } });
  assert.equal(suffix.status, 206);
  assert.equal((await suffix.arrayBuffer()).byteLength, 32);
  const invalid = await fetch(url, { headers: { Range: `bytes=${size}-` } });
  assert.equal(invalid.status, 416);
  await invalid.text();
});
test('bad URLs and unsupported methods do not stop the server', async () => {
  const bad = await fetch(`${origin}/%ZZ`);
  assert.equal(bad.status, 400);
  await bad.text();
  const post = await fetch(origin, { method: 'POST' });
  assert.equal(post.status, 405);
  await post.text();
  const secret = await fetch(`${origin}/..%2f.git/config`);
  assert.equal(secret.status, 403);
  await secret.text();
  const page = await fetch(origin);
  assert.equal(page.status, 200);
  await page.text();
});
