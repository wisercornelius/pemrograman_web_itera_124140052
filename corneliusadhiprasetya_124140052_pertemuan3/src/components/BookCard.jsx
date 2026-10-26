import PropTypes from 'prop-types';

const STATUS = {
  owned: { label: 'Dimiliki', icon: '✓' },
  reading: { label: 'Sedang dibaca', icon: '◷' },
  wishlist: { label: 'Ingin dibeli', icon: '＋' },
};
const COVER_COLORS = ['cover-sage', 'cover-rose', 'cover-sand', 'cover-blue', 'cover-lilac'];

export default function BookCard({ book, index, onEdit, onDelete }) {
  const status = STATUS[book.status];
  const initials = book.title.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase();

  return (
    <article className="book-card">
      <div className={`book-cover ${COVER_COLORS[index % COVER_COLORS.length]}`} aria-label={`Sampul dekoratif untuk ${book.title}`}>
        <span className="cover-spark" aria-hidden="true">✳</span>
        <span className="cover-initials">{initials}</span>
        <span className="cover-lines" aria-hidden="true" />
      </div>
      <div className="book-info">
        <span className={`status-badge status-${book.status}`}><span aria-hidden="true">{status.icon}</span>{status.label}</span>
        <h3>{book.title}</h3>
        <p className="book-author">oleh {book.author}</p>
        <div className="card-actions">
          <button className="text-action" type="button" onClick={() => onEdit(book)} aria-label={`Edit ${book.title}`}>Edit <span aria-hidden="true">↗</span></button>
          <button className="text-action delete-action" type="button" onClick={() => onDelete(book.id)} aria-label={`Hapus ${book.title}`}>Hapus</button>
        </div>
      </div>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({ id: PropTypes.string.isRequired, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired }).isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
