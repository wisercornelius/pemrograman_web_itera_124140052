# Dashboard Jadwal dan Tugas Kuliah - Pertemuan 2

**Nama**: Cornelius Adhi Prasetya  
**NIM**: 124140052  
**Mata Kuliah**: Praktikum Pemrograman Web (PAW)  
**Pertemuan**: 2

## 📋 Deskripsi Proyek

Aplikasi web interaktif yang membantu mahasiswa mengelola jadwal kuliah dan daftar tugas dengan mudah. Aplikasi ini menggunakan **JavaScript OOP** dengan dua kelas utama: `TaskItem` dan `DashboardApp` untuk manajemen state, penyimpanan data di `localStorage`, dan integrasi API sederhana.

## ✨ Fitur Utama

### 1. **Jadwal Kuliah** 📅
- Tambah, edit, dan hapus jadwal kuliah
- Input mencakup: mata kuliah, hari, jam mulai, jam selesai, dan ruang/kelas
- Validasi input (nama matkul min. 3 karakter, jam selesai > jam mulai)
- Urutan otomatis berdasarkan hari (Senin-Sabtu) dan jam
- Tampilan badge hari dan informasi waktu

### 2. **Daftar Tugas** 📝
- Tambah, edit, dan hapus tugas
- Input mencakup: judul, mata kuliah, prioritas (Tinggi/Sedang/Rendah), dan tanggal tenggat
- Validasi input (judul min. 3 karakter, tenggat wajib diisi)
- Tracking status selesai dengan checkbox
- Progress bar visual untuk persentase tugas yang selesai
- Filter untuk menyembunyikan tugas yang sudah selesai
- Informasi tenggat dinamis:
  - Jika telat: "Telat X hari" (warna merah)
  - Jika sisa ≤ 3 hari: "Sisa X hari" (warna kuning)
  - Jika > 3 hari: Tampilkan tanggal

### 3. **Integrasi API** 🌐
- Tombol "Muat Contoh (API)" yang mengambil 5 tugas dari **JSONPlaceholder API**
- Menampilkan status loading/error dengan feedback visual
- Data API secara otomatis disimpan ke `localStorage`

## 🏗️ Arsitektur & Teknologi

### **Class: TaskItem**
```javascript
class TaskItem {
  constructor({ id, jenis, judul, meta, selesai })
  toggle()      // Toggle status selesai
  toJSON()      // Serialisasi untuk localStorage
  fromJSON()    // Deserialisasi dari JSON
}
```
- `id`: Unique identifier (timestamp + random string)
- `jenis`: "jadwal" atau "tugas"
- `judul`: Nama mata kuliah (jadwal) atau judul tugas
- `meta`: Objek yang berisi field spesifik per jenis
- `selesai`: Boolean status (hanya untuk tugas)

### **Class: DashboardApp**
```javascript
class DashboardApp {
  constructor()           // Load data dari localStorage
  add(item)              // Tambah item
  update(item)           // Update item
  remove(jenis, id)      // Hapus item
  load(key)              // Load dari localStorage
  saveAll()              // Simpan ke localStorage
  sortedJadwal()         // Sort jadwal by hari & jam
  sortedTugas()          // Sort tugas by status & tenggat
  static fetchSeedTugas() // Async fetch dari API
}
```

### **Teknologi**
- **HTML5**: Struktur markup semantic
- **CSS3**: Responsive design dengan grid dan flexbox
- **JavaScript ES6+**:
  - OOP dengan class
  - Spread operator untuk immutable state
  - Arrow functions
  - Template literals
  - Async/await untuk API calls
- **localStorage**: Persistensi data
- **EventDelegation**: Efficient event handling

## 📂 Struktur File

```
corneliusadhiprasetya_124140052_pertemuan2/
├── index.html          # Markup HTML
├── style.css          # Styling
├── script.js          # JavaScript logic (403 lines)
├── serve.js           # Simple HTTP server
├── screenshots/       # Screenshot dokumentasi
│   ├── 01_tampilan_awal.png
│   ├── 02_tambah_jadwal.png
│   ├── 03_tambah_tugas.png
│   ├── 04_jadwal_filled.png
│   ├── 05_tugas_filled.png
│   ├── 06_edit_jadwal.png
│   ├── 07_edit_tugas.png
│   ├── 08_filter_hide_done.png
│   ├── 09_api_loading.png
│   └── 10_api_seeded.png
└── README.md          # Dokumentasi ini
```

## 🚀 Cara Menjalankan

### **Opsi 1: Menggunakan serve.js**
```bash
node serve.js
# Akses di http://localhost:8000
```

### **Opsi 2: Menggunakan Live Server (VS Code)
Buka `index.html` dengan Live Server extension

### **Opsi 3: Python HTTP Server**
```bash
python -m http.server 8000
# Akses di http://localhost:8000
```

## 💾 Penyimpanan Data

Data disimpan di `localStorage` dengan key:
- `dtKuliah_jadwal_124140052` - Array jadwal kuliah
- `dtKuliah_tugas_124140052` - Array tugas

Format penyimpanan adalah JSON stringify dari array `TaskItem`.

## 🎯 Konsep JavaScript yang Digunakan

1. **Object-Oriented Programming (OOP)**
   - Encapsulation dengan class
   - Method untuk operasi
   - Static method untuk async API

2. **State Management**
   - State terpusat di `DashboardApp`
   - Immutable updates dengan spread operator
   - Single source of truth

3. **DOM Manipulation**
   - Event delegation untuk list items
   - Dynamic template rendering
   - Form validation

4. **Asynchronous JavaScript**
   - Async/await untuk fetch API
   - Try/catch untuk error handling
   - Button state management (disabled, text change)

5. **Data Persistence**
   - localStorage read/write
   - JSON serialization/deserialization

## 🎨 User Interface

### **Layout**
- Header dengan branding
- Main container dengan 2 card (Jadwal & Tugas)
- Responsive grid untuk form inputs
- List items dengan action buttons

### **Validasi Visual**
- Error messages di bawah input field
- Input styling untuk state invalid
- Button feedback (disabled state)

### **Interactive Features**
- Edit inline dengan form scroll-into-view
- Delete dengan confirmation dialog
- Progress bar animasi
- Badge styling untuk priority & status

## 📝 Testing Checklist

- [x] Tambah jadwal dengan validasi
- [x] Edit jadwal (perubahan data & button state)
- [x] Hapus jadwal (confirmation + render)
- [x] Tambah tugas dengan validasi
- [x] Edit tugas (preserve status selesai)
- [x] Hapus tugas
- [x] Toggle status selesai tugas
- [x] Filter hide done
- [x] Progress bar update
- [x] Sort jadwal by hari & jam
- [x] Sort tugas by status & tenggat
- [x] Load dari API
- [x] localStorage persist (F5 refresh)
- [x] XSS prevention dengan escapeHtml

## 📸 Screenshot Hasil

Lihat folder `screenshots/` untuk dokumentasi visual fitur-fitur aplikasi.

### Deskripsi Screenshot:
1. **Tampilan Awal** - Layout kosong dengan form
2. **Tambah Jadwal** - Form input jadwal terisi
3. **Tambah Tugas** - Form input tugas terisi
4. **Jadwal Terisi** - List jadwal dengan sorting
5. **Tugas Terisi** - List tugas dengan badges & progress
6. **Edit Jadwal** - Mode edit dengan button Simpan
7. **Edit Tugas** - Mode edit dengan button Simpan
8. **Filter Hide Done** - Menampilkan hanya tugas belum selesai
9. **API Loading** - Button state saat fetch
10. **API Seeded** - Tugas dari API berhasil dimuat

## ✅ Validasi & Error Handling

### **Form Validation**
- Mata kuliah/Judul: min. 3 karakter
- Jam mulai: required
- Jam selesai: required + harus > jam mulai
- Tenggat: required

### **API Error Handling**
- Try/catch pada fetch
- Fallback button text "Gagal memuat API"
- Auto-reset button setelah 2.5 detik

### **XSS Prevention**
- Fungsi `escapeHtml()` untuk user input
- Safe template rendering

## 🔒 Security Features

- Input sanitization dengan `escapeHtml()`
- No eval() atau innerHTML dengan user data
- Safe event delegation

## 🎓 Learning Outcomes

Materi yang dipelajari di pertemuan 2:
- ✅ Class dan OOP di JavaScript
- ✅ State management pattern
- ✅ localStorage API
- ✅ Async/await & Fetch API
- ✅ Event delegation & event handling
- ✅ Template literals & string interpolation
- ✅ Spread operator & array methods
- ✅ Input validation & error handling
- ✅ Dynamic DOM manipulation

---

**Last Updated**: 17 Oktober 2026  
**Status**: ✅ Completed
