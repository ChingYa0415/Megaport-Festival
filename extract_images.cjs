const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\angus\\.claude\\projects\\C--vscode\\a089b5ad-2c8f-4f02-a11e-850c90bf0565.jsonl', 'utf-8').split('\n');
let idx = 0;

function findImages(d) {
  if (!d || typeof d !== 'object') return;
  if (Array.isArray(d)) { d.forEach(findImages); return; }
  if (d.type === 'image' && d.source && d.source.type === 'base64') {
    const buf = Buffer.from(d.source.data, 'base64');
    const path = 'C:\\Users\\angus\\AppData\\Local\\Temp\\schedule_img_' + idx + '.jpg';
    fs.writeFileSync(path, buf);
    console.log('Saved image ' + idx + ' to ' + path + ' (' + buf.length + ' bytes)');
    idx++;
  }
  Object.values(d).forEach(findImages);
}

lines.forEach(line => {
  try { findImages(JSON.parse(line)); } catch(e) {}
});
console.log('Total images found: ' + idx);
