// Dashboard Jadwal dan Tugas Kuliah
// Pertemuan 2 • Kelas TaskItem + DashboardApp (state, localStorage, async fetch sederhana)

const KEYS = Object.freeze({
  jadwal: "dtKuliah_jadwal_124140052",
  tugas: "dtKuliah_tugas_124140052",
});

// API publik sederhana (tanpa API key) untuk tombol "Muat Contoh (API)"
const API_SEED = "https://jsonplaceholder.typicode.com/todos?_limit=5";

const HARI_URUT = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function tanggalDepan(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function infoTenggat(tenggat) {
  if (!tenggat) return { label: "Tanpa tenggat", cls: "" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${tenggat}T00:00:00`);
  const diff = Math.round((due - today) / 86400000);
  if (diff < 0) return { label: `Telat ${Math.abs(diff)} hari`, cls: "telat" };
  if (diff === 0) return { label: "Tenggat hari ini", cls: "telat" };
  if (diff <= 3) return { label: `Sisa ${diff} hari`, cls: "sisa" };
  return { label: formatDate(tenggat), cls: "" };
}

// ---------------------------------------------------------------------------
// Class 1: model data setiap item (jadwal / tugas)
// ---------------------------------------------------------------------------
class TaskItem {
  constructor({ id = uid(), jenis, judul, meta = {}, selesai = false }) {
    this.id = id;
    this.jenis = jenis;              // "jadwal" | "tugas"
    this.judul = judul;
    this.meta = meta;                // field spesifik per jenis
    this.selesai = selesai;
    this.createdAt = Date.now();
  }

  static fromJSON(obj) {
    return new TaskItem(obj);
  }

  toggle() {
    this.selesai = !this.selesai;
    return this.selesai;
  }

  toJSON() {
    const { id, jenis, judul, meta, selesai, createdAt } = this;
    return { id, jenis, judul, meta, selesai, createdAt };
  }
}

// ---------------------------------------------------------------------------
// Class 2: aplikasi dashboard (state + localStorage + operasi async fetch)
// ---------------------------------------------------------------------------
class DashboardApp {
  constructor() {
    this.jadwal = this.load(KEYS.jadwal);
    this.tugas = this.load(KEYS.tugas);
    this.editing = { jadwal: null, tugas: null };
    this.hideDone = false;
  }

  // --- localStorage (serialisasi JSON) ---
  load(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      return JSON.parse(raw).map((o) => TaskItem.fromJSON(o));
    } catch {
      return [];
    }
  }

  saveAll() {
    localStorage.setItem(KEYS.jadwal, JSON.stringify(this.jadwal.map((it) => it.toJSON())));
    localStorage.setItem(KEYS.tugas, JSON.stringify(this.tugas.map((it) => it.toJSON())));
  }

  // --- operasi CRUD dengan spread operator (state immutable) ---
  add(item) {
    if (item.jenis === "jadwal") this.jadwal = [...this.jadwal, item];
    if (item.jenis === "tugas") this.tugas = [...this.tugas, item];
    this.saveAll();
  }

  update(item) {
    const key = this.keyOf(item.jenis);
    this[key] = this[key].map((it) => (it.id === item.id ? item : it));
    this.saveAll();
  }

  remove(jenis, id) {
    const key = this.keyOf(jenis);
    this[key] = this[key].filter((it) => it.id !== id);
    this.saveAll();
  }

  keyOf(jenis) {
    return { jadwal: "jadwal", tugas: "tugas" }[jenis];
  }

  // --- operasi asinkron: ambil 5 tugas contoh dari API publik ---
  static async fetchSeedTugas() {
    const res = await fetch(API_SEED);
    if (!res.ok) throw new Error("API tidak tersedia");
    const data = await res.json();
    return data.slice(0, 5).map((t) => new TaskItem({
      jenis: "tugas",
      judul: t.title,
      meta: { matkul: "Contoh (API JSONPlaceholder)", tenggat: tanggalDepan(3), prioritas: "Sedang" },
      selesai: t.completed,
    }));
  }

  sortedJadwal() {
    return [...this.jadwal].sort((a, b) => {
      const d = HARI_URUT.indexOf(a.meta.hari) - HARI_URUT.indexOf(b.meta.hari);
      return d !== 0 ? d : a.meta.jamMulai.localeCompare(b.meta.jamMulai);
    });
  }

  sortedTugas() {
    return [...this.tugas].sort((a, b) => {
      if (a.selesai !== b.selesai) return a.selesai ? 1 : -1;
      return (a.meta.tenggat || "9999").localeCompare(b.meta.tenggat || "9999");
    });
  }
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------
const app = new DashboardApp();
const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------------------
// RENDER (template literals)
// ---------------------------------------------------------------------------
const renderJadwal = () => {
  const list = app.sortedJadwal();
  $("jadwalCount").textContent = list.length;
  $("listJadwal").innerHTML = list.length === 0
    ? `<p class="empty">Belum ada jadwal. Isi form di atas untuk menambah kelas.</p>`
    : list.map((it) => {
        const { hari, jamMulai, jamSelesai, ruang } = it.meta;
        return `
        <li class="item" data-id="${it.id}">
          <div>
            <p class="item-title">${escapeHtml(it.judul)}</p>
            <p class="item-meta">🕘 ${jamMulai} – ${jamSelesai}</p>
            ${ruang ? `<p class="item-meta">📍 ${escapeHtml(ruang)}</p>` : ""}
            <div class="badges"><span class="badge hari">${hari}</span></div>
          </div>
          <div class="actions">
            <button class="icon-btn" data-act="edit" data-jenis="jadwal">✏️</button>
            <button class="icon-btn del" data-act="hapus" data-jenis="jadwal">🗑</button>
          </div>
        </li>`;
      }).join("");
};

const renderTugas = () => {
  const semua = app.sortedTugas();
  const list = app.hideDone ? semua.filter((t) => !t.selesai) : semua;
  const selesai = semua.filter((t) => t.selesai).length;

  $("tugasCount").textContent = semua.length;
  $("progressText").textContent = `${selesai}/${semua.length} selesai`;
  $("progressBar").style.width = semua.length ? `${(selesai / semua.length) * 100}%` : "0%";

  $("listTugas").innerHTML = list.length === 0
    ? `<p class="empty">Tidak ada tugas${app.hideDone ? " (yang belum selesai)" : ""}.</p>`
    : list.map((it) => {
        const { matkul, tenggat, prioritas } = it.meta;
        const t = infoTenggat(tenggat);
        const clsPrioritas = { Tinggi: "tinggi", Sedang: "sedang", Rendah: "rendah" }[prioritas] ?? "sedang";
        return `
        <li class="item ${it.selesai ? "done" : ""}" data-id="${it.id}">
          <div>
            <p class="item-title">
              <label class="check"><input type="checkbox" data-act="toggle" ${it.selesai ? "checked" : ""}> ${escapeHtml(it.judul)}</label>
            </p>
            ${matkul ? `<p class="item-meta">🎓 ${escapeHtml(matkul)}</p>` : ""}
            <div class="badges">
              <span class="badge ${clsPrioritas}">${prioritas}</span>
              <span class="badge ${t.cls}">⏳ ${t.label}</span>
            </div>
          </div>
          <div class="actions">
            <button class="icon-btn" data-act="edit" data-jenis="tugas">✏️</button>
            <button class="icon-btn del" data-act="hapus" data-jenis="tugas">🗑</button>
          </div>
        </li>`;
      }).join("");
};

const renderSemua = () => { renderJadwal(); renderTugas(); };

// ---------------------------------------------------------------------------
// Form JADWAL
// ---------------------------------------------------------------------------
$("formJadwal").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("jadwalId").value;
  const judul = $("jadwalMatkul").value.trim();
  const hari = $("jadwalHari").value;
  const jamMulai = $("jadwalJamMulai").value;
  const jamSelesai = $("jadwalJamSelesai").value;
  const ruang = $("jadwalRuang").value.trim();

  let valid = true;
  const setErr = (errId, inputId, msg) => {
    $(errId).textContent = msg;
    $(inputId).classList.toggle("invalid", Boolean(msg));
    if (msg) valid = false;
  };

  setErr("errMatkul", "jadwalMatkul", judul.length < 3 ? "Nama matkul min. 3 karakter." : "");
  setErr("errJamMulai", "jadwalJamMulai", !jamMulai ? "Jam mulai wajib diisi." : "");
  setErr("errJamSelesai", "jadwalJamSelesai",
    !jamSelesai ? "Jam selesai wajib diisi."
      : jamSelesai <= jamMulai ? "Jam selesai harus setelah jam mulai." : "");
  if (!valid) return;

  const item = new TaskItem({
    id: id || uid(),
    jenis: "jadwal",
    judul,
    meta: { hari, jamMulai, jamSelesai, ruang },
  });

  id ? app.update(item) : app.add(item);
  resetFormJadwal();
  renderSemua();
});

const resetFormJadwal = () => {
  $("formJadwal").reset();
  $("jadwalId").value = "";
  $("btnJadwal").textContent = "+ Tambah Jadwal";
  $("btnJadwalBatal").classList.add("hidden");
  ["errMatkul", "errJamMulai", "errJamSelesai"].forEach((e) => ($(e).textContent = ""));
  ["jadwalMatkul", "jadwalJamMulai", "jadwalJamSelesai"].forEach((i) => $(i).classList.remove("invalid"));
};

$("btnJadwalBatal").addEventListener("click", resetFormJadwal);

const mulaiEditJadwal = (id) => {
  const it = app.jadwal.find((x) => x.id === id);
  if (!it) return;
  $("jadwalId").value = it.id;
  $("jadwalMatkul").value = it.judul;
  $("jadwalHari").value = it.meta.hari;
  $("jadwalJamMulai").value = it.meta.jamMulai;
  $("jadwalJamSelesai").value = it.meta.jamSelesai;
  $("jadwalRuang").value = it.meta.ruang ?? "";
  $("btnJadwal").textContent = "💾 Simpan Perubahan";
  $("btnJadwalBatal").classList.remove("hidden");
  $("formJadwal").scrollIntoView({ behavior: "smooth", block: "center" });
};

// ---------------------------------------------------------------------------
// Form TUGAS
// ---------------------------------------------------------------------------
$("formTugas").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("tugasId").value;
  const judul = $("tugasJudul").value.trim();
  const matkul = $("tugasMatkul").value.trim();
  const tenggat = $("tugasTenggat").value;
  const prioritas = $("tugasPrioritas").value;

  let valid = true;
  const setErr = (errId, inputId, msg) => {
    $(errId).textContent = msg;
    $(inputId).classList.toggle("invalid", Boolean(msg));
    if (msg) valid = false;
  };

  setErr("errJudul", "tugasJudul", judul.length < 3 ? "Judul tugas min. 3 karakter." : "");
  setErr("errTenggat", "tugasTenggat", !tenggat ? "Tenggat wajib dipilih." : "");
  if (!valid) return;

  const lama = id ? app.tugas.find((x) => x.id === id) : null;
  const item = new TaskItem({
    id: id || uid(),
    jenis: "tugas",
    judul,
    meta: { matkul, tenggat, prioritas },
    selesai: lama?.selesai ?? false,
  });

  id ? app.update(item) : app.add(item);
  resetFormTugas();
  renderSemua();
});

const resetFormTugas = () => {
  $("formTugas").reset();
  $("tugasId").value = "";
  $("btnTugas").textContent = "+ Tambah Tugas";
  $("btnTugasBatal").classList.add("hidden");
  $("errJudul").textContent = "";
  $("errTenggat").textContent = "";
  $("tugasJudul").classList.remove("invalid");
  $("tugasTenggat").classList.remove("invalid");
};

$("btnTugasBatal").addEventListener("click", resetFormTugas);

const mulaiEditTugas = (id) => {
  const it = app.tugas.find((x) => x.id === id);
  if (!it) return;
  $("tugasId").value = it.id;
  $("tugasJudul").value = it.judul;
  $("tugasMatkul").value = it.meta.matkul ?? "";
  $("tugasTenggat").value = it.meta.tenggat ?? "";
  $("tugasPrioritas").value = it.meta.prioritas ?? "Sedang";
  $("btnTugas").textContent = "💾 Simpan Perubahan";
  $("btnTugasBatal").classList.remove("hidden");
  $("formTugas").scrollIntoView({ behavior: "smooth", block: "center" });
};

$("filterHideDone").addEventListener("change", (e) => {
  app.hideDone = e.target.checked;
  renderTugas();
});

// ---------------------------------------------------------------------------
// Delegasi event list (edit / hapus / toggle)
// ---------------------------------------------------------------------------
document.querySelector(".layout").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-act]");
  if (!btn) return;
  const { act, jenis } = btn.dataset;
  const id = btn.closest(".item")?.dataset.id;
  if (!id || act === "toggle") return;

  if (act === "hapus") {
    if (!confirm("Hapus item ini?")) return;
    app.remove(jenis, id);
    ({ jadwal: resetFormJadwal, tugas: resetFormTugas }[jenis])();
    renderSemua();
  }

  if (act === "edit") {
    app.editing[jenis] = id;
    ({ jadwal: mulaiEditJadwal, tugas: mulaiEditTugas }[jenis])(id);
  }
});

document.querySelector(".layout").addEventListener("change", (e) => {
  if (e.target.matches('[data-act="toggle"]')) {
    const id = e.target.closest(".item")?.dataset.id;
    const it = app.tugas.find((x) => x.id === id);
    if (it) { it.toggle(); app.saveAll(); renderTugas(); }
  }
});

// ---------------------------------------------------------------------------
// Tombol "Muat Contoh (API)" — pemanggilan async/await ke API JSONPlaceholder
// ---------------------------------------------------------------------------
$("btnSeed").addEventListener("click", async () => {
  const btn = $("btnSeed");
  btn.disabled = true;
  btn.textContent = "Memuat…";
  try {
    const items = await DashboardApp.fetchSeedTugas();
    items.forEach((it) => app.add(it));
    renderSemua();
    btn.textContent = "✓ 5 tugas contoh dimuat";
  } catch {
    btn.textContent = "✗ Gagal memuat API";
  } finally {
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Muat Contoh (API)";
    }, 2500);
  }
});

// --- Init ---
renderSemua();
