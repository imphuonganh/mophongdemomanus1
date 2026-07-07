# Interactive Chemistry Simulation - H₂ Covalent Bond

Một mô phỏng tương tác về quá trình hình thành liên kết cộng hóa trị trong phân tử H₂. Xây dựng bằng HTML5 Canvas, CSS3 Glassmorphism, và JavaScript thuần.

## 🎯 Tính năng

- **Mô phỏng 2D chân thực:** Hiển thị hai nguyên tử Hydrogen và quỹ đạo electron
- **5 Giai đoạn:** Nhảy nhanh đến các mốc quan trọng (0%, 25%, 50%, 75%, 100%)
- **Thanh tiến trình seekable:** Kéo để điều chỉnh trạng thái mô phỏng
- **Điều khiển Play/Pause/Reset:** Kiểm soát toàn bộ animation
- **Panel thông tin khoa học:** Hiển thị khoảng cách nguyên tử và giải thích chi tiết
- **Giao diện Glassmorphism:** Phong cách hiện đại với blur effect
- **Responsive Design:** Hoạt động tốt trên desktop, tablet, mobile

## 📋 Cấu trúc Dự án

```
chemistry-sim/
├── index.html      # Cấu trúc HTML chính
├── style.css       # Styling Glassmorphism
├── app.js          # Logic mô phỏng và điều khiển
└── README.md       # Tài liệu này
```

## 🚀 Cách Sử Dụng Cục Bộ

### 1. Mở trực tiếp
Chỉ cần mở file `index.html` trong trình duyệt:
```bash
open index.html
```

### 2. Dùng Local Server (Khuyến nghị)
```bash
# Python 3
python3 -m http.server 8000

# Hoặc Node.js
npx http-server
```

Sau đó truy cập: `http://localhost:8000`

## 🌐 Deploy lên GitHub Pages

### Bước 1: Tạo Repository
```bash
git init
git add .
git commit -m "Initial commit: H2 Chemistry Simulation"
```

### Bước 2: Tạo Repository trên GitHub
1. Truy cập [github.com/new](https://github.com/new)
2. Tạo repository tên: `chemistry-sim` (hoặc tên khác)
3. Chọn **Public** để enable GitHub Pages

### Bước 3: Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/chemistry-sim.git
git branch -M main
git push -u origin main
```

### Bước 4: Enable GitHub Pages
1. Vào **Settings** → **Pages**
2. Chọn **Branch: main**, **Folder: / (root)**
3. Nhấn **Save**

Website sẽ được deploy tại: `https://YOUR_USERNAME.github.io/chemistry-sim`

## 🎮 Hướng Dẫn Sử Dụng

### Các Nút Điều Khiển

| Nút | Chức Năng |
|-----|----------|
| ▶️ Play | Bắt đầu animation |
| ⏸️ Pause | Tạm dừng animation |
| ⏹️ Reset | Quay lại trạng thái ban đầu (0%) |
| **0%** | Nhảy đến giai đoạn 0 - Bắt đầu |
| **25%** | Nhảy đến giai đoạn 1 - Tiến lại gần |
| **50%** | Nhảy đến giai đoạn 2 - Electron chuyển động |
| **75%** | Nhảy đến giai đoạn 3 - Hình thành liên kết |
| **100%** | Nhảy đến giai đoạn 4 - Hoàn thành |

### Thanh Tiến Trình

- **Kéo slider:** Điều chỉnh trạng thái mô phỏng từ 0% đến 100%
- **Hiển thị:** Phần trăm hoàn thành của quá trình hình thành liên kết

### Panel Thông Tin

- **Thông tin mô phỏng:** Tên, số electron lớp ngoài, loại nguyên tử
- **Khoảng cách:** Cập nhật theo trạng thái (Rất xa → Rất gần)
- **Giải thích khoa học:** Mô tả chi tiết từng giai đoạn

## 🔬 Khoa Học Đằng Sau

### Giai Đoạn Hình Thành Liên Kết H₂

1. **0-25%:** Hai nguyên tử H ở khoảng cách xa, mỗi nguyên tử có 1 electron
2. **25-50%:** Nguyên tử tiến lại gần, lực hút Coulomb bắt đầu tác động
3. **50-75%:** Electron di chuyển vào vùng giữa hai hạt nhân
4. **75-100%:** Hai electron được dùng chung, tạo thành liên kết cộng hóa trị

### Đặc Điểm Liên Kết H₂

- **Loại liên kết:** Cộng hóa trị (σ-bond)
- **Số electron chia sẻ:** 2 (1 từ mỗi nguyên tử)
- **Cấu hình electron:** Tương tự khí hiếm Helium (1s²)
- **Năng lượng liên kết:** ~436 kJ/mol

## 🛠️ Công Nghệ Sử Dụng

- **HTML5:** Cấu trúc ngữ nghĩa
- **CSS3:** Glassmorphism, Flexbox, Grid, Animation
- **JavaScript (ES6+):** Canvas API, Event Handling, State Management
- **Font Awesome:** Icons cho các nút điều khiển

## 📱 Tương Thích Trình Duyệt

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🎨 Tùy Chỉnh

### Thay Đổi Màu Sắc
Chỉnh sửa các biến CSS trong `style.css`:
```css
:root {
    --primary-color: #4a90e2;      /* Màu chính */
    --secondary-color: #7b68ee;    /* Màu phụ */
    --text-color: #2c3e50;         /* Màu chữ */
}
```

### Thay Đổi Tốc Độ Animation
Trong `app.js`, chỉnh sửa:
```javascript
progress += 0.5;  // Tăng giá trị để animation nhanh hơn
```

### Thay Đổi Kích Thước Nguyên Tử
```javascript
this.radius = 35;        // Bán kính hạt nhân
this.orbitRadius = 80;   // Bán kính quỹ đạo
```

## 📄 Giấy Phép

MIT License - Tự do sử dụng, sửa đổi, và phân phối

## 👤 Tác Giả

**IMPHUONGANH** - 2026

## 💡 Gợi Ý Cải Tiến

- [ ] Thêm mô phỏng các phân tử khác (O₂, N₂, HCl)
- [ ] Thêm chế độ 3D
- [ ] Thêm âm thanh khi electron chuyển động
- [ ] Thêm chế độ tối (Dark Mode)
- [ ] Xuất kết quả dưới dạng hình ảnh/video

## 📞 Liên Hệ & Phản Hồi

Nếu bạn có bất kỳ câu hỏi hoặc gợi ý, vui lòng tạo một Issue trên GitHub.

---

**Chúc bạn học tập vui vẻ! 🎓**
