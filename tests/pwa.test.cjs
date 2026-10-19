const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
execFileSync(process.execPath, [path.join(root, 'scripts/build-site.cjs')]);
const output = path.join(root, '_site');
const buildContext = { self: {} };
vm.runInNewContext(fs.readFileSync(path.join(output, 'precache-manifest.js'), 'utf8'), buildContext);
const build = buildContext.self.LUMASCALE_BUILD;
const scope = 'https://example.github.io/lumascale/';

function worker({ failInstall = false } = {}) {
  const listeners = new Map();
  const deleted = [];
  const installed = [];
  const cached = new Map([[`${scope}index.html`, 'offline sanctuary'], [`${scope}assets/dragon.png`, 'offline dragon']]);
  let skipped = false;
  const self = {
    registration: { scope },
    LUMASCALE_BUILD: { version: 'test', files: ['index.html', 'app.js'] },
    addEventListener: (type, callback) => listeners.set(type, callback),
    clients: { claim: async () => {} },
    skipWaiting: () => { skipped = true; }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'sw.js'), 'utf8'), {
    self,
    URL,
    importScripts() {},
    fetch: async () => { throw new Error('Network is offline'); },
    caches: {
      open: async () => ({
        addAll: async files => { if (failInstall) throw new Error('Interrupted installation'); installed.push(...files); },
        match: async request => cached.get(typeof request === 'string' ? request : request.url),
        put: async () => {}
      }),
      keys: async () => [`lumascale:${scope}:old`, `lumascale:${scope}:test`, 'money-compass-v1', 'lumascale:https://example.github.io/other/:old'],
      delete: async name => { deleted.push(name); return true; }
    }
  });
  async function lifecycle(type) {
    let completion;
    listeners.get(type)({ waitUntil: promise => { completion = promise; } });
    return completion;
  }
  function request(url, mode = 'cors') {
    let response;
    listeners.get('fetch')({ request: { url, mode, method: 'GET' }, respondWith: promise => { response = promise; } });
    return response;
  }
  return { lifecycle, request, listeners, deleted, installed, skipped: () => skipped };
}

test('phone manifest and icon dimensions support project-relative installation', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(output, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.id, './');
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.display, 'standalone');
  for (const icon of manifest.icons) {
    const bytes = fs.readFileSync(path.join(output, icon.src));
    assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`, icon.sizes);
  }
  assert.ok(manifest.icons.some(icon => icon.purpose === 'maskable'));
  assert.ok(fs.existsSync(path.join(output, 'icons/apple-touch-icon.png')));
});

test('public build precaches only existing app files and artwork', () => {
  assert.ok(build.files.length > 50);
  for (const file of build.files) {
    assert.ok(!file.startsWith('/') && !file.includes('..'), file);
    assert.ok(!/Stitch Files|processed-preview|\.zip|\.env|credentials|token\.json|tests\//i.test(file), file);
    assert.ok(fs.existsSync(path.join(output, file)), file);
  }
  assert.ok(!fs.existsSync(path.join(output, 'Stitch Files')));
  assert.ok(!fs.existsSync(path.join(output, 'assets/processed-preview')));
  assert.match(build.version, /^[a-f0-9]{16}$/);
});

test('identical app files produce the same offline version', () => {
  execFileSync(process.execPath, [path.join(root, 'scripts/build-site.cjs')]);
  const context = { self: {} };
  vm.runInNewContext(fs.readFileSync(path.join(output, 'precache-manifest.js'), 'utf8'), context);
  assert.equal(context.self.LUMASCALE_BUILD.version, build.version);
});

test('offline navigation and artwork come from this app cache', async () => {
  const app = worker();
  assert.equal(await app.request(scope, 'navigate'), 'offline sanctuary');
  assert.equal(await app.request(`${scope}assets/dragon.png`), 'offline dragon');
});

test('worker leaves other projects and unrelated requests alone', async () => {
  const app = worker();
  assert.equal(app.request('https://example.github.io/money-compass/', 'navigate'), undefined);
  assert.equal(app.request(`${scope}credentials.json`), undefined);
  await app.lifecycle('activate');
  assert.deepEqual(app.deleted, [`lumascale:${scope}:old`]);
});

test('installed updates wait for explicit activation', async () => {
  const app = worker();
  await app.lifecycle('install');
  assert.deepEqual(app.installed, [`${scope}index.html`, `${scope}app.js`]);
  assert.equal(app.skipped(), false);
  app.listeners.get('message')({ data: { type: 'SKIP_WAITING' } });
  assert.equal(app.skipped(), true);
});

test('an interrupted install removes its incomplete cache', async () => {
  const app = worker({ failInstall: true });
  await assert.rejects(app.lifecycle('install'), /Interrupted installation/);
  assert.deepEqual(app.deleted, [`lumascale:${scope}:test`]);
});