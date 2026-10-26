import PropTypes from 'prop-types';
import BookCard from './BookCard';

export default function BookList({ books, onEdit, onDelete, hasFilters }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden="true"><span>✳</span><span>▱</span></div>
        <p className="eyebrow">RAK BUKU MASIH KOSONG</p>
        <h2>{hasFilters ? 'Belum menemukan buku' : 'Cerita pertamamu dimulai di sini.'}</h2>
        <p>{hasFilters ? 'Coba ubah kata kunci atau filter status yang dipilih.' : 'Tambahkan buku yang kamu punya, sedang baca, atau ingin kamu miliki.'}</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book, index) => <BookCard key={book.id} book={book} index={index} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  hasFilters: PropTypes.bool.isRequired,
};
