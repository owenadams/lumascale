const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const output = path.join(root, process.argv.includes('--preview') ? '.pages-preview/lumascale' : '_site');
const core = ['index.html', 'styles.css', 'app.js', 'pwa.js', 'manifest.webmanifest', 'sw.js'];
const assets = [];
function collect(directory) {
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not publishable: ${directory}/${entry.name}`);
    if (entry.name === 'processed-preview' || entry.name.startsWith('.')) continue;
    const relative = `${directory}/${entry.name}`;
    if (entry.isDirectory()) collect(relative);
    else if (/\.(?:png|webp|jpg|jpeg|svg|gif|woff2?)$/i.test(entry.name)) assets.push(relative);
  }
}
collect('assets');
collect('icons');
const publish = [...core, ...assets].sort();
const hash = crypto.createHash('sha256');
for (const file of publish) {
  hash.update(file);
  hash.update(fs.readFileSync(path.join(root, file)));
}
const version = hash.digest('hex').slice(0, 16);
if (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) throw new Error('Build output cannot be a symbolic link.');
fs.mkdirSync(output, { recursive: true });
const expected = new Set([...publish, 'precache-manifest.js', '.nojekyll']);
function prune(directory, relative = '') {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    const file = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Build output contains a symbolic link: ${file}`);
    if (entry.isDirectory()) prune(target, file);
    else if (!expected.has(file)) fs.unlinkSync(target);
  }
}
prune(output);
for (const file of publish) {
  const target = path.join(output, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, file), target);
}
const precache = { version, files: publish.filter(file => file !== 'sw.js') };
fs.writeFileSync(path.join(output, 'precache-manifest.js'), `self.LUMASCALE_BUILD = ${JSON.stringify(precache, null, 2)};\n`);
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Built ${publish.length + 2} public files; offline version ${version}.`);
console.log(`Output: ${path.relative(root, output)}`);