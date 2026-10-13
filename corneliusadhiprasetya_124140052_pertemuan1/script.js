// Mini POS — Kasir Kantin Kampus
// Kompetensi: validasi form + kalkulator otomatis + localStorage

const STORAGE_KEY = "miniPosCart_124140052";
const PROMO_CODE = "HEMAT10";
const DISKON_RATE = 0.1;
const BATAS_DISKON_OTOMATIS = 50000;
const HARGA_MINIMAL = 500;

const form = document.getElementById("formBarang");
const inNama = document.getElementById("namaBarang");
const inHarga = document.getElementById("hargaSatuan");
const inQty = document.getElementById("qty");
const inPromo = document.getElementById("kodePromo");
const inBayar = document.getElementById("uangBayar");

const errNama = document.getElementById("errNama");
const errHarga = document.getElementById("errHarga");
const errQty = document.getElementById("errQty");
const errBayar = document.getElementById("errBayar");
const infoPromo = document.getElementById("infoPromo");
const infoKembalian = document.getElementById("infoKembalian");

const elTotalBelanja = document.getElementById("totalBelanja");
const elDiskon = document.getElementById("nominalDiskon");
const elPromoAktif = document.getElementById("promoAktif");
const elTotalAkhir = document.getElementById("totalAkhir");
const elKembalian = document.getElementById("kembalian");

const cartBody = document.getElementById("cartBody");
const cartCount = document.getElementById("cartCount");
const emptyMsg = document.getElementById("emptyMsg");

let cart = loadCart();
let promoAktif = false;

function formatRp(n) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function clearError() {
  errNama.textContent = "";
  errHarga.textContent = "";
  errQty.textContent = "";
  inNama.classList.remove("invalid");
  inHarga.classList.remove("invalid");
  inQty.classList.remove("invalid");
}

function validateInput(nama, harga, qty) {
  let valid = true;
  clearError();

  if (!nama || nama.trim().length < 3) {
    errNama.textContent = "Nama barang wajib diisi, minimal 3 karakter.";
    inNama.classList.add("invalid");
    valid = false;
  }

  if (harga === "" || harga === null || Number.isNaN(Number(harga))) {
    errHarga.textContent = "Harga satuan wajib diisi berupa angka.";
    inHarga.classList.add("invalid");
    valid = false;
  } else if (Number(harga) < HARGA_MINIMAL) {
    errHarga.textContent = `Harga minimal Rp ${HARGA_MINIMAL}. Tidak boleh 0, negatif, atau kosong.`;
    inHarga.classList.add("invalid");
    valid = false;
  }

  const qtyNum = Number(qty);
  if (qty === "" || !Number.isInteger(qtyNum) || qtyNum < 1) {
    errQty.textContent = "Qty wajib berupa angka bulat minimal 1.";
    inQty.classList.add("invalid");
    valid = false;
  }

  return valid;
}

function hitungTotal() {
  return cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
}

function hitungDiskon(total) {
  const autoSyarat = total >= BATAS_DISKON_OTOMATIS;
  if (autoSyarat || promoAktif) return Math.round(total * DISKON_RATE);
  return 0;
}

function render() {
  cartBody.innerHTML = "";

  cart.forEach((item, i) => {
    const subtotal = item.harga * item.qty;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td class="wrap">${escapeHtml(item.nama)}</td>
      <td>${formatRp(item.harga)}</td>
      <td>${item.qty}</td>
      <td>${formatRp(subtotal)}</td>
      <td><button class="btn-hapus" data-index="${i}">Hapus</button></td>
    `;
    cartBody.appendChild(tr);
  });

  const totalItem = cart.reduce((s, it) => s + it.qty, 0);
  cartCount.textContent = `${cart.length} baris • ${totalItem} item`;
  emptyMsg.style.display = cart.length === 0 ? "block" : "none";

  const total = hitungTotal();
  const diskon = hitungDiskon(total);
  const totalAkhir = total - diskon;

  elTotalBelanja.textContent = formatRp(total);
  elDiskon.textContent = formatRp(diskon);
  elPromoAktif.textContent = promoAktif ? PROMO_CODE : (total >= BATAS_DISKON_OTOMATIS ? "Otomatis 10%" : "-");
  elTotalAkhir.textContent = formatRp(totalAkhir);

  // Kalkulator pembayaran & kembalian
  const bayar = Number(inBayar.value);
  if (inBayar.value === "" || inBayar.value === null) {
    elKembalian.textContent = formatRp(0);
    infoKembalian.textContent = "";
    errBayar.textContent = "";
  } else if (Number.isNaN(bayar) || bayar < 0) {
    elKembalian.textContent = formatRp(0);
    errBayar.textContent = "Uang bayar harus berupa angka positif.";
    infoKembalian.textContent = "";
  } else {
    errBayar.textContent = "";
    const kembali = bayar - totalAkhir;
    if (cart.length === 0) {
      elKembalian.textContent = formatRp(0);
      infoKembalian.textContent = "";
    } else if (kembali < 0) {
      elKembalian.textContent = formatRp(0);
      infoKembalian.textContent = `Uang belum mencukupi. Kurang ${formatRp(Math.abs(kembali))}.`;
    } else {
      elKembalian.textContent = formatRp(kembali);
      infoKembalian.textContent = "";
    }
  }

  if (promoAktif) {
    infoPromo.textContent = `Kode ${PROMO_CODE} aktif — diskon 10% diterapkan.`;
  } else if (total >= BATAS_DISKON_OTOMATIS) {
    infoPromo.textContent = "Total ≥ Rp 50.000 — diskon otomatis 10% diterapkan.";
  } else {
    infoPromo.textContent = "Diskon otomatis 10% jika total ≥ Rp 50.000, atau gunakan kode HEMAT10.";
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = inNama.value;
  const harga = inHarga.value;
  const qty = inQty.value;

  if (!validateInput(nama, Number(harga), qty)) return;

  cart.push({ nama: nama.trim(), harga: Number(harga), qty: Number(qty) });
  saveCart();
  render();
  form.reset();
  clearError();
  inNama.focus();
});

cartBody.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-hapus");
  if (!btn) return;
  const idx = Number(btn.dataset.index);
  cart.splice(idx, 1);
  saveCart();
  render();
});

document.getElementById("btnPromo").addEventListener("click", () => {
  const kode = inPromo.value.trim().toUpperCase();
  if (kode === PROMO_CODE) {
    promoAktif = true;
  } else if (kode === "") {
    promoAktif = false;
  } else {
    promoAktif = false;
    infoPromo.textContent = "Kode promo tidak dikenal. Gunakan HEMAT10.";
    render();
    return;
  }
  render();
});

inBayar.addEventListener("input", render);
inPromo.addEventListener("input", () => {
  if (inPromo.value.trim() === "") {
    promoAktif = false;
    render();
  }
});

document.getElementById("btnReset").addEventListener("click", () => {
  cart = [];
  promoAktif = false;
  inBayar.value = "";
  inPromo.value = "";
  localStorage.removeItem(STORAGE_KEY);
  render();
  form.reset();
  clearError();
});

// Live validation: hapus pesan error saat user memperbaiki input
inNama.addEventListener("input", () => {
  if (inNama.value.trim().length >= 3) {
    errNama.textContent = "";
    inNama.classList.remove("invalid");
  }
});
inHarga.addEventListener("input", () => {
  if (Number(inHarga.value) >= HARGA_MINIMAL) {
    errHarga.textContent = "";
    inHarga.classList.remove("invalid");
  }
});
inQty.addEventListener("input", () => {
  const v = Number(inQty.value);
  if (Number.isInteger(v) && v >= 1) {
    errQty.textContent = "";
    inQty.classList.remove("invalid");
  }
});

render();
