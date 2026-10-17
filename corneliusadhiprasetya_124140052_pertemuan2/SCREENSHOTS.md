# 📸 Screenshots Hasil Aplikasi

## Dokumentasi Visual - Dashboard Jadwal dan Tugas Kuliah

Dokumen ini menjelaskan setiap screenshot dari aplikasi **Dashboard Jadwal dan Tugas Kuliah** Pertemuan 2.

---

## 1️⃣ Tampilan Awal (Initial State)
**File**: `01_tampilan_awal.png`

**Deskripsi**:
- Layout aplikasi saat pertama kali dibuka
- Header dengan branding "Dashboard Jadwal dan Tugas Kuliah"
- Dua card kosong: "📅 Jadwal Kuliah" dan "📝 Daftar Tugas"
- Form input untuk jadwal dengan fields: Mata Kuliah, Hari, Ruang, Jam Mulai, Jam Selesai
- Form input untuk tugas dengan fields: Judul Tugas, Mata Kuliah, Prioritas, Tenggat
- Counter di setiap card menampilkan "0"

**Fitur yang ditampilkan**:
- ✅ Responsive header
- ✅ Form layout dengan grid
- ✅ Placeholder inputs

---

## 2️⃣ Tambah Jadwal (Jadwal Form Filled)
**File**: `02_tambah_jadwal.png`

**Deskripsi**:
- Form jadwal terisi dengan contoh data:
  - Mata Kuliah: "Pemrograman Web"
  - Hari: "Senin"
  - Ruang: "Lab Informatika 2.1"
  - Jam Mulai: "10:00"
  - Jam Selesai: "12:00"
- Button "+ Tambah Jadwal" siap diklik

**Fitur yang ditampilkan**:
- ✅ Form input fields
- ✅ Select dropdown untuk hari
- ✅ Time input fields
- ✅ Primary button styling

---

## 3️⃣ Tambah Tugas (Tugas Form Filled)
**File**: `03_tambah_tugas.png`

**Deskripsi**:
- Form tugas terisi dengan contoh data:
  - Judul Tugas: "Laporan Praktikum Web"
  - Mata Kuliah: "Pemrograman Web"
  - Prioritas: "🔴 Tinggi"
  - Tenggat: "2026-10-20"
- Button "+ Tambah Tugas" siap diklik

**Fitur yang ditampilkan**:
- ✅ Text input untuk judul
- ✅ Select dropdown untuk prioritas dengan emoji
- ✅ Date input untuk tenggat

---

## 4️⃣ Jadwal Terisi (Jadwal List)
**File**: `04_jadwal_filled.png`

**Deskripsi**:
- List jadwal menampilkan 3 jadwal yang sudah ditambahkan:
  1. Pemrograman Web - Senin, 10:00-12:00, Lab Informatika 2.1
  2. Basis Data - Rabu, 13:00-15:30, Lab Informatika 2.3
  3. Sistem Operasi - Kamis, 08:00-10:00, Ruang Kuliah 3.2
- Counter di card menampilkan "3"
- Setiap item memiliki badge hari (warna berbeda)
- Setiap item memiliki action buttons: ✏️ Edit dan 🗑 Delete

**Fitur yang ditampilkan**:
- ✅ Rendered list dari state
- ✅ Sorted by hari (Senin, Rabu, Kamis)
- ✅ Timestamp formatting
- ✅ Action buttons
- ✅ Counter update

---

## 5️⃣ Tugas Terisi (Tugas List dengan Progress)
**File**: `05_tugas_filled.png`

**Deskripsi**:
- List tugas menampilkan 4 tugas dengan:
  - Checkbox untuk mark as done
  - Judul tugas
  - Mata kuliah (icon 🎓)
  - Badge prioritas: 🔴 Tinggi, 🟡 Sedang, 🟢 Rendah
  - Badge tenggat dengan dynamic info:
    - ⏳ Sisa 2 hari (kuning)
    - ⏳ Sisa 1 hari (kuning)
    - ⏳ Tanggal (normal)
- Counter: "2/4 selesai" (2 tugas sudah dicheck)
- Progress bar: 50% filled (visual indication)
- Toolbar dengan checkbox "Sembunyikan yang selesai" dan button "Muat Contoh (API)"

**Fitur yang ditampilkan**:
- ✅ Rendered list dari state
- ✅ Sorted by status (belum selesai dulu)
- ✅ Sorted by tenggat
- ✅ Dynamic tenggat calculation
- ✅ Priority badges dengan warna
- ✅ Progress bar visual
- ✅ Checkbox toggle

---

## 6️⃣ Edit Jadwal (Edit Mode)
**File**: `06_edit_jadwal.png`

**Deskripsi**:
- Form jadwal dalam mode edit (triggered by ✏️ button):
  - Fields sudah terisi dengan data existing item
  - Button berubah dari "+ Tambah Jadwal" menjadi "💾 Simpan Perubahan"
  - Button baru muncul: "Batal Edit" untuk cancel
  - Error messages cleared
  - Form scroll-into-view untuk accessibility

**Fitur yang ditampilkan**:
- ✅ Populate form dengan existing data
- ✅ Button state change
- ✅ Edit mode indicator
- ✅ Cancel button

---

## 7️⃣ Edit Tugas (Edit Mode)
**File**: `07_edit_tugas.png`

**Deskripsi**:
- Form tugas dalam mode edit:
  - Fields sudah terisi dengan data existing item
  - Button berubah dari "+ Tambah Tugas" menjadi "💾 Simpan Perubahan"
  - Button "Batal Edit" muncul
  - Status selesai tetap dipreserve (tidak reset)

**Fitur yang ditampilkan**:
- ✅ Edit mode untuk tugas
- ✅ Button state management
- ✅ Data persistence pada checkbox state

---

## 8️⃣ Filter Hide Done (Hide Completed Tasks)
**File**: `08_filter_hide_done.png`

**Deskripsi**:
- Checkbox "Sembunyikan yang selesai" sudah di-check
- List tugas hanya menampilkan 2 tugas yang belum selesai
- Tugas yang sudah done (line-through style) tersembunyi
- Counter dan progress bar tetap menampilkan total: "2/4 selesai"
- Progress bar tetap 50%

**Fitur yang ditampilkan**:
- ✅ Filter logic
- ✅ Conditional rendering
- ✅ Counter tidak berubah
- ✅ Checkbox state persistence

---

## 9️⃣ API Loading State
**File**: `09_api_loading.png`

**Deskripsi**:
- Button "Muat Contoh (API)" sedang loading:
  - Text berubah menjadi "Memuat…"
  - Button disabled (tidak bisa diklik)
  - Loading spinner animation (jika ada)
- Browser console menunjukkan fetch request ke JSONPlaceholder API

**Fitur yang ditampilkan**:
- ✅ Async fetch operation
- ✅ Button disabled state
- ✅ Loading feedback
- ✅ Network request visualization

---

## 🔟 API Seeded (API Data Loaded)
**File**: `10_api_seeded.png`

**Deskripsi**:
- Button "Muat Contoh (API)" berubah menjadi "✓ 5 tugas contoh dimuat" (success feedback)
- List tugas sekarang menampilkan 5 tugas tambahan dari API JSONPlaceholder:
  - Title dari API (e.g., "Delectus aut autem", "Quis ut et quisquam", dll)
  - Mata Kuliah: "Contoh (API JSONPlaceholder)"
  - Prioritas: 🟡 Sedang (default)
  - Tenggat: 3 hari ke depan dari hari ini
  - Status selesai dari API (beberapa sudah checked)
- Total tugas sekarang 9 (4 manual + 5 dari API)
- Counter update: "X/9 selesai"
- Progress bar update sesuai calculated percentage
- Setelah 2.5 detik, button reset kembali ke "Muat Contoh (API)"

**Fitur yang ditampilkan**:
- ✅ Successful API call
- ✅ Data integration dengan state
- ✅ Items render dengan API data
- ✅ localStorage auto-save
- ✅ Button success/reset feedback
- ✅ Sorting dengan data baru

---

## 📊 Screenshots Ringkasan

| # | Nama File | Deskripsi | Fitur Kunci |
|---|-----------|-----------|------------|
| 1 | `01_tampilan_awal.png` | Initial state | Layout, form kosong |
| 2 | `02_tambah_jadwal.png` | Jadwal form filled | Input validation ready |
| 3 | `03_tambah_tugas.png` | Tugas form filled | Input validation ready |
| 4 | `04_jadwal_filled.png` | Jadwal list | Sorting, badges, actions |
| 5 | `05_tugas_filled.png` | Tugas list | Progress, priority, tenggat |
| 6 | `06_edit_jadwal.png` | Edit jadwal mode | Edit flow, button state |
| 7 | `07_edit_tugas.png` | Edit tugas mode | Edit flow, button state |
| 8 | `08_filter_hide_done.png` | Filter applied | Hide done feature |
| 9 | `09_api_loading.png` | API loading | Async feedback |
| 10 | `10_api_seeded.png` | API success | Data integration, re-render |

---

## 🎯 Fitur yang Dicakup oleh Screenshots

✅ **CRUD Operations**
- Create: Screenshots #2, #3, #10
- Read: Screenshots #4, #5, #8
- Update: Screenshots #6, #7
- Delete: (dapat ditest dengan alert confirmation)

✅ **Validasi**
- Input validation messages
- Error state styling
- Required field enforcement

✅ **State Management**
- Form reset setelah submit
- Counter update
- Progress calculation
- Filter state persistence

✅ **Asynchronous**
- API fetch dengan async/await
- Loading state
- Error handling
- Success feedback

✅ **Data Persistence**
- localStorage save/load
- Data persists after F5 refresh

✅ **UI/UX**
- Responsive layout
- Color coding (priority, status)
- Icon usage (emoji)
- Button feedback
- Sort functionality

✅ **Accessibility**
- Form labels
- Error messages
- Semantic HTML
- Keyboard navigation

---

## 🚀 Cara Capture Screenshots

Untuk mengambil screenshot aplikasi:

1. **Jalankan aplikasi**:
   ```bash
   node serve.js
   # atau
   python -m http.server 8000
   ```

2. **Akses di browser**:
   ```
   http://localhost:8000
   ```

3. **Capture setiap tahap**:
   - Gunakan browser DevTools (F12) untuk consistent screenshots
   - Gunakan Print Screen atau Snipping Tool
   - Simpan dengan format PNG di folder `screenshots/`

4. **Naming convention**:
   ```
   01_tampilan_awal.png
   02_tambah_jadwal.png
   ... dst
   ```

---

**Last Updated**: 17 Oktober 2026  
**Total Screenshots**: 10  
**Status**: ✅ Documentation Complete
