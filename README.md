# Mang Chữ Về Cho Mẹ

Ứng dụng học chữ phổ thông cho phụ huynh dân tộc thiểu số, trải nghiệm tối giản – dễ dùng – giàu tính cảm xúc.

## 🎯 Mục Tiêu

Ứng dụng được thiết kế đặc biệt cho phụ huynh dân tộc thiểu số (25-50 tuổi) với:
- ✨ **Tối giản**: Ít chữ, nhiều khoảng thở
- 🎯 **Dễ dùng**: Thiết kế cho người lớn tuổi
- ❤️ **Giàu cảm xúc**: Không tạo áp lực học tập
- 🍎 **Apple-like minimal**: Phong cách thiết kế tinh tế

## 🚀 Công Nghệ

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Pure CSS with CSS Variables
- **Icons**: Lucide React
- **Design System**: Material Design State Layers
- **Motion**: CSS Animations (subtle & calm)

## 📦 Cài Đặt

```bash
# Clone repository
git clone <repository-url>
cd mang-chu-ve-cho-me

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## 📂 Cấu Trúc Thư Mục

```
mang-chu-ve-cho-me/
├── public/
│   ├── backgrounds/        # Hình nền (Background1.webp, Background2.webp, illustration.webp)
│   ├── vectors/           # Hình ảnh vector (300x300px)
│   │   ├── alphabet/      # 29 chữ cái .webp
│   │   ├── numbers/       # 10 số .webp
│   │   ├── animals/       # 8 con vật .webp
│   │   ├── nature/        # 8 thiên nhiên .webp
│   │   ├── items/         # 8 đồ dùng .webp
│   │   ├── clothes/       # 8 trang phục .webp
│   │   └── family/        # 8 người thân .webp
│   └── audio/             # File âm thanh .mp3 (cùng cấu trúc với vectors)
│
├── src/
│   ├── components/
│   │   ├── ui/            # UI components (Button, Card, Icon)
│   │   └── common/        # Common components (Header)
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts (Audio, Auth)
│   ├── data/              # Data files (lessons, teachers)
│   ├── utils/             # Utilities (quizLogic, storage)
│   ├── styles/            # Global styles (theme, motion)
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Tính Năng

### 1. Trang Chủ (Landing)
- Background ấm áp với hình minh họa mẹ con
- Tiêu đề lớn: "MANG CHỮ VỀ CHO MẸ"
- Nút "Bắt Đầu" duy nhất
- Icons Settings & Share ở góc phải trên

### 2. Dashboard
- 3 khung lớn: Bài Học, Kiểm Tra, Hướng Dẫn
- Responsive: 1 cột (mobile) → 2 cột (tablet) → 3 cột (desktop)

### 3. Bài Học
6 chủ đề:
1. Bảng chữ cái & số đếm (39 items)
2. Con vật (8 items)
3. Thiên nhiên & thời tiết (8 items)
4. Đồ dùng & dụng cụ (8 items)
5. Trang phục (8 items)
6. Người thân trong gia đình (8 items)

**Chi tiết bài học:**
- 1 từ / 1 màn hình
- Hình ảnh lớn (300x300px)
- Chữ rất to
- Nút phát âm (với audio .mp3)
- Vuốt trái/phải để chuyển từ
- Keyboard navigation (Arrow keys)
- Progress bar

### 4. Kiểm Tra
- **Authentication** (Google hoặc Email - placeholder)
- **Phân quyền**:
  - Giáo viên: Xem điểm, chỉnh sửa
  - Học viên: Làm bài kiểm tra
- **Cấu trúc**: 10 câu × 10 điểm = 100 điểm
- Mỗi câu: 4 hình ảnh lựa chọn, 60 giây
- Auto-advance sau khi chọn
- Auto-submit khi hết giờ
- Quiz state persists (localStorage)
- Feedback: Viền xanh (đúng) / đỏ (sai)

### 5. Kết Quả
- Hiển thị điểm số cuối cùng
- Thông điệp khích lệ
- Nút "Làm lại" và "Trang chủ"

### 6. Hướng Dẫn
- 4 bước sử dụng app
- Mục tiêu dự án
- Thông tin liên hệ

### 7. Settings & Share
- **Settings**:
  - Bật/tắt âm thanh (centralized AudioManager)
  - Thanh điều chỉnh âm lượng
- **Share**:
  - Facebook, TikTok, X (Twitter)
  - Copy link

## 🎭 Design System

### Colors
```css
--color-primary: #FF8B5A      /* Cam ấm */
--color-secondary: #FFD4B8    /* Cam nhạt */
--color-accent: #4A90E2       /* Xanh dương */
--color-success: #52C17F      /* Xanh lá */
--color-error: #FF6B6B        /* Đỏ */
```

### Typography
- **Display**: Quicksand, Be Vietnam Pro
- **Body**: Nunito, Be Vietnam Pro
- **Heading**: Be Vietnam Pro

### Motion Principles
- **Subtle**: Không bounce mạnh
- **Calm**: Smooth transitions (200-300ms)
- **Human**: Natural, không giật lag

## 📱 Responsive

### Breakpoints
- **Mobile**: < 768px (1 column)
- **Tablet**: 768px - 1023px (2 columns)
- **Desktop**: ≥ 1024px (3 columns)

### Touch-friendly
- Minimum touch target: 44x44px
- Swipe gestures for lessons
- Safe area support for notched devices

## ♿ Accessibility

- Keyboard navigation
- Focus visible (outline)
- ARIA labels for icon buttons
- prefers-reduced-motion support
- Screen reader friendly

## 🎵 Audio Management

Centralized AudioManager via React Context:
- Only one audio plays at a time
- Global mute/volume controls
- Mobile Safari compatible (user-gesture safe)
- Lazy loading (preload="none")

## 🔐 Authentication

Placeholder implementation:
- Google OAuth (simulated)
- Email/Password (simulated)
- Role-based access (teacher/student)
- Teacher allowlist in `/src/data/teachers.js`

## 💾 Data Persistence

- Quiz state: localStorage
- Auth state: localStorage
- Clears on quiz completion

## 📊 Quiz Logic

State machine with strict rules:
- 10 random questions from 40 items
- No duplicates
- 60s per question
- Auto-advance on answer
- Auto-submit on timeout
- Review mode (read-only navigation)

## 🎯 Performance

- Lazy loading images
- Preloaded backgrounds
- Audio loaded on demand (.mp3)
- .webp format (optimized)

## 🔧 Development

```bash
# Development
npm run dev

# Build
npm run build

# Preview production
npm run preview
```

## 📝 Notes

- All assets (images, audio) are placeholders - update paths in `/public` directory
- Teacher emails configured in `/src/data/teachers.js`
- Quiz questions generated from 5 topics (animals, nature, items, clothes, family)
- Alphabet topic excluded from quiz per requirements

## 📄 License

This project is for educational purposes.
