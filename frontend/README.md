# Jobstreet Classifier Frontend

Frontend aplikasi untuk klasifikasi pekerjaan menggunakan React + TypeScript + Vite.

## 🚀 Features

- **Modern UI**: React dengan TypeScript dan Vite untuk development yang cepat
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile
- **Real-time API Status**: Monitoring status koneksi ke backend
- **Dual Model Support**: Pilihan antara model GRU dan SVM
- **Interactive Results**: Visualisasi confidence scores dan top 3 predictions
- **Error Handling**: Penanganan error yang user-friendly

## 📁 Struktur Project

```
frontend/
├─ src/
│  ├─ api/
│  │  └─ client.ts                 # API client untuk komunikasi dengan FastAPI
│  │
│  ├─ components/
│  │  ├─ PredictForm.tsx           # Form input job title & description + pilih model
│  │  └─ ResultCard.tsx            # Tampilan hasil prediksi dengan confidence scores
│  │
│  ├─ App.tsx                      # Main component
│  ├─ App.css                      # Styling utama
│  ├─ main.tsx                     # Entry point
│  └─ index.css                    # Global styles
│
├─ public/                         # Static assets
├─ index.html                      # HTML template
├─ package.json                    # Dependencies dan scripts
├─ vite.config.ts                  # Vite configuration
├─ tsconfig.json                   # TypeScript configuration
└─ README.md                       # Dokumentasi ini
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn
- Backend API berjalan di `http://localhost:8000`

### Installation

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build untuk production:**

   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🔧 Configuration

### API Configuration

File `src/api/client.ts` berisi konfigurasi untuk komunikasi dengan backend:

```typescript
const API_BASE_URL = "http://localhost:8000";
```

### Vite Proxy

`vite.config.ts` sudah dikonfigurasi dengan proxy untuk development:

```typescript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

## 📱 Usage

1. **Buka aplikasi** di `http://localhost:3000`
2. **Pastikan API status "Online"** (indikator hijau di header)
3. **Isi form:**
   - Job Title: Masukkan judul pekerjaan
   - Job Description: Masukkan deskripsi pekerjaan
   - Pilih model: GRU (Neural Network) atau SVM
4. **Klik "Predict Job Category"**
5. **Lihat hasil:**
   - Kategori yang diprediksi
   - Top 3 predictions dengan confidence scores
   - Processed text (hasil preprocessing)

## 🎨 UI Components

### PredictForm

- Form input untuk job title dan description
- Radio buttons untuk memilih model (GRU/SVM)
- Validation dan loading states
- Clear button untuk reset form

### ResultCard

- Tampilan hasil prediksi yang menarik
- Confidence bars dengan animasi
- Error handling dengan pesan yang jelas
- Processed text untuk debugging

## 🔌 API Integration

### Endpoints yang digunakan:

- `GET /health` - Health check
- `POST /predict?model={gru|svm}` - Prediksi kategori job

### Error Handling:

- Network errors
- API errors
- Validation errors
- Loading states

## 🚀 Development

### Available Scripts:

- `npm run dev` - Start development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Tech Stack:

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool dan dev server
- **CSS3** - Styling dengan gradients dan animations

## 🎯 Features Highlights

- **Real-time API monitoring** dengan status indicator
- **Responsive design** yang bekerja di semua device
- **Smooth animations** untuk better UX
- **Type-safe** dengan TypeScript
- **Modern CSS** dengan gradients dan backdrop filters
- **Error boundaries** untuk handling errors
- **Loading states** untuk better feedback

## 🔧 Customization

### Styling

Edit `src/App.css` untuk mengubah tampilan:

- Color scheme
- Layout
- Animations
- Responsive breakpoints

### API Configuration

Edit `src/api/client.ts` untuk:

- Mengubah base URL
- Menambah endpoints baru
- Modify request/response handling

## 📝 Notes

- Aplikasi ini dirancang untuk bekerja dengan backend FastAPI
- Proxy configuration memungkinkan development tanpa CORS issues
- TypeScript memberikan type safety untuk API calls
- CSS menggunakan modern features seperti backdrop-filter dan CSS Grid
