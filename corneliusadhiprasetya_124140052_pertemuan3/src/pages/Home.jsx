import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks } from '../context/BookContext';
import { Link } from 'react-router-dom';
import BookForm from '../components/BookForm';
import BookFilters from '../components/BookFilters';
import BookList from '../components/BookList';
import useBookStats from '../hooks/useBookStats';

export default function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [editingBook, setEditingBook] = useState(null);
  const stats = useBookStats(books);

  useEffect(() => {
    document.title = 'Koleksi Buku — Ruang Baca';
  }, []);

  const visibleBooks = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('id-ID');
    return books.filter((book) => {
      const matchesStatus = status === 'all' || book.status === status;
      const matchesSearch = !query || `${book.title} ${book.author}`.toLocaleLowerCase('id-ID').includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [books, search, status]);

  const handleSubmit = (bookData) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      addBook(bookData);
    }
  };

  const handleDelete = (id) => {
    deleteBook(id);
    if (editingBook?.id === id) setEditingBook(null);
  };

  return (
    <main className="page-shell">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">SENANG MELIHATMU KEMBALI</p>
          <h1>Rak bukumu, <em>ceritamu.</em></h1>
          <p className="welcome-copy">Simpan buku yang menemanimu hari ini dan yang ingin kamu baca esok hari.</p>
        </div>
        <div className="collection-count"><span className="count-number">{stats.total.toString().padStart(2, '0')}</span><span>judul<br />terkumpul</span><span className="count-star" aria-hidden="true">✳</span></div>
      </section>

      <div className="home-layout">
        <aside className="form-panel"><BookForm book={editingBook} onSubmit={handleSubmit} onCancel={() => setEditingBook(null)} /></aside>
        <section className="collection-panel" aria-labelledby="collection-heading">
          <div className="section-title-row">
            <div><p className="eyebrow">KOLEKSI PRIBADI</p><h2 id="collection-heading">Rak buku <span>({stats.total})</span></h2></div>
            <Link className="stats-shortcut" to="/statistik">Lihat ringkasan <span aria-hidden="true">↗</span></Link>
          </div>
          <BookFilters search={search} status={status} onSearchChange={setSearch} onStatusChange={setStatus} resultCount={visibleBooks.length} />
          <BookList books={visibleBooks} onEdit={setEditingBook} onDelete={handleDelete} hasFilters={Boolean(search || status !== 'all')} />
        </section>
      </div>
      <footer className="page-footer"><span>RUANG BACA · KOLEKSI KECIL, CERITA BESAR</span><span>Disimpan otomatis di perangkatmu ✳</span></footer>
    </main>
  );
}

Home.propTypes = {};
