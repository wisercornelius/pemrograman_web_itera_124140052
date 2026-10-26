import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const EMPTY_BOOK = { title: '', author: '', status: '' };
const STATUS_OPTIONS = [
  { value: 'owned', label: 'Sudah dimiliki' },
  { value: 'reading', label: 'Sedang dibaca' },
  { value: 'wishlist', label: 'Ingin dibeli' },
];

export default function BookForm({ book = null, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_BOOK);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(book ? { title: book.title, author: book.author, status: book.status } : EMPTY_BOOK);
    setErrors({});
  }, [book]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Judul buku wajib diisi.';
    if (!form.author.trim()) nextErrors.author = 'Nama penulis wajib diisi.';
    if (!form.status) nextErrors.status = 'Pilih status buku.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    onSubmit({ title: form.title.trim(), author: form.author.trim(), status: form.status });
    if (!book) setForm(EMPTY_BOOK);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{book ? 'PERBARUI CATATAN' : 'TAMBAHKAN KE RAK'}</p>
          <h2>{book ? 'Edit buku' : 'Buku baru'}</h2>
        </div>
        <span className="form-icon" aria-hidden="true">✳</span>
      </div>
      <label className="field-label" htmlFor="book-title">Judul buku</label>
      <input id="book-title" name="title" value={form.title} onChange={updateField} placeholder="Contoh: Laut Bercerita" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'title-error' : undefined} />
      {errors.title && <p className="field-error" id="title-error" role="alert">{errors.title}</p>}
      <label className="field-label" htmlFor="book-author">Nama penulis</label>
      <input id="book-author" name="author" value={form.author} onChange={updateField} placeholder="Contoh: Leila S. Chudori" aria-invalid={Boolean(errors.author)} aria-describedby={errors.author ? 'author-error' : undefined} />
      {errors.author && <p className="field-error" id="author-error" role="alert">{errors.author}</p>}
      <label className="field-label" htmlFor="book-status">Status membaca</label>
      <select id="book-status" name="status" value={form.status} onChange={updateField} aria-invalid={Boolean(errors.status)} aria-describedby={errors.status ? 'status-error' : undefined}>
        <option value="">Pilih status buku</option>
        {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {errors.status && <p className="field-error" id="status-error" role="alert">{errors.status}</p>}
      <div className="form-actions">
        <button className="button button-primary form-submit" type="submit">{book ? 'Simpan perubahan' : 'Tambahkan buku'} <span aria-hidden="true">↗</span></button>
        {book && <button className="button button-quiet" type="button" onClick={onCancel}>Batal</button>}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  book: PropTypes.shape({ id: PropTypes.string, title: PropTypes.string.isRequired, author: PropTypes.string.isRequired, status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

