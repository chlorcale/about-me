# CV (static, pixel)

Đặt thư mục này vào repo `chlorcale.github.io` → xem tại https://chlorcale.github.io/cv/

## Việc cần làm
1. Thay `assets/rooster_64x64.png` (đang là hình tạm) bằng sprite gà của bạn.
2. Tìm `TODO` trong `index.html` và điền (ngành, năm học, kỹ năng, mảng nguyện vọng...).
3. Xem thử: `python -m http.server 8000` rồi mở `http://localhost:8000/cv/`.
   Thêm `?theme=light` để xem bản nền sáng.

## Xuất PDF (1 trang A4, link bấm được)
```bash
cd cv
npm i
npx playwright install chromium
npm run pdf          # nền tối
npm run pdf:light    # nền sáng
```
Kết quả: `Nguyen-Mai-Huy-Phat-CV.pdf`. Script báo nếu PDF quá 1 trang hoặc quá 10 MB.

Font Poxiao Pixel dùng theo SIL OFL 1.1 (xem `assets/POXIAO-NOTICE.md`).
