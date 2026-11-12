// Dùng: npm run pdf (nền tối) | npm run pdf:light (nền sáng, đỡ tốn mực)
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFileSync, statSync, readFileSync } from 'node:fs';

const dir = dirname(fileURLToPath(import.meta.url));
const theme = process.argv[2] === 'light' ? 'light' : 'dark';
const out = join(dir, 'Nguyen-Mai-Huy-Phat-CV.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(join(dir, 'index.html')).href + `?theme=${theme}`);
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });

const overflow = await page.evaluate(() => {
  const s = document.querySelector('.sheet');
  return s.scrollHeight - s.clientHeight;
});
writeFileSync(out, await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true }));
await browser.close();

const pages = (readFileSync(out, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
const mb = (statSync(out).size / 1048576).toFixed(2);
console.log(`PDF: ${out}\nTrang: ${pages} | Dung lượng: ${mb} MB | Theme: ${theme}`);
if (pages !== 1) console.warn('⚠ PDF không đúng 1 trang. Rút gọn nội dung hoặc giảm cỡ chữ trong style.css.');
if (overflow > 0) console.warn(`⚠ Nội dung tràn ${overflow}px, phần dưới đang bị cắt.`);
if (statSync(out).size > 10 * 1048576) console.warn('⚠ File lớn hơn 10 MB, form sẽ không nhận.');
