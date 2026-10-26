import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import useBookStats from '../hooks/useBookStats';

const STATUS_INFO = [
  { key: 'owned', title: 'Sudah dimiliki', note: 'Buku di rakmu', icon: '▤', className: 'stat-owned' },
  { key: 'reading', title: 'Sedang dibaca', note: 'Cerita yang berlangsung', icon: '◷', className: 'stat-reading' },
  { key: 'wishlist', title: 'Ingin dibeli', note: 'Petualangan berikutnya', icon: '✳', className: 'stat-wishlist' },
];

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);
  useEffect(() => { document.title = 'Statistik — Ruang Baca'; }, []);

  return (
    <main className="page-shell stats-page">
      <div className="stats-intro">
        <p className="eyebrow">CATATAN PERJALANAN MEMBACA</p>
        <h1>Seberapa jauh <em>ceritamu?</em></h1>
        <p>Semua buku punya tempatnya. Ini ringkasan kecil dari koleksi pribadimu.</p>
      </div>
      <section className="stats-total-card">
        <div><p className="eyebrow">SELURUH KOLEKSI</p><p className="stats-total-number">{stats.total}<span> buku</span></p><p className="stats-total-note">Setiap judul menyimpan dunia baru untuk dijelajahi.</p></div>
        <div className="stats-art" aria-hidden="true"><span>▰</span><span>▰</span><span>▰</span><span>✳</span></div>
      </section>
      <section className="stats-breakdown" aria-label="Jumlah buku per status">
        {STATUS_INFO.map((item) => (
          <article key={item.key} className={`stat-card ${item.className}`}>
            <span className="stat-icon" aria-hidden="true">{item.icon}</span>
            <p className="eyebrow">{item.title.toUpperCase()}</p>
            <p className="stat-number">{stats[item.key]}</p>
            <p className="stat-note">{item.note}</p>
          </article>
        ))}
      </section>
      <div className="stats-quote"><span aria-hidden="true">“</span><p>“Membaca adalah perjalanan yang tak membutuhkan tiket pulang.”</p><Link to="/">Kembali ke koleksi <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}

Stats.propTypes = {};
