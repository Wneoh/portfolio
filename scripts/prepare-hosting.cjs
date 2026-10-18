const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
fs.mkdirSync(output, { recursive: true });
const files = ['index.html', 'asset/css/main.css', 'asset/css/media_query.css', 'asset/js/content.js', 'asset/js/myparticle.js', 'asset/Victor-Neoh-Resume.pdf'];
for (const file of files) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(root, file), destination);
}
fs.cpSync(path.join(root, 'asset/img'), path.join(output, 'asset/img'), { recursive: true });
console.log('Prepared Firebase Hosting files in dist/');
