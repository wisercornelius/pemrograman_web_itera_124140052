import PropTypes from 'prop-types';

const FILTERS = [
  { value: 'all', label: 'Semua buku' },
  { value: 'owned', label: 'Dimiliki' },
  { value: 'reading', label: 'Sedang dibaca' },
  { value: 'wishlist', label: 'Ingin dibeli' },
];

export default function BookFilters({ search, status, onSearchChange, onStatusChange, resultCount }) {
  return (
    <section className="library-toolbar" aria-label="Cari dan filter buku">
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <label className="sr-only" htmlFor="book-search">Cari judul atau penulis</label>
        <input id="book-search" type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Cari judul atau penulis..." />
        <span className="result-count">{resultCount} buku</span>
      </div>
      <div className="filter-tabs" aria-label="Filter berdasarkan status">
        {FILTERS.map((filter) => (
          <button key={filter.value} type="button" className={status === filter.value ? 'filter-tab selected' : 'filter-tab'} onClick={() => onStatusChange(filter.value)} aria-pressed={status === filter.value}>{filter.label}</button>
        ))}
      </div>
    </section>
  );
}

BookFilters.propTypes = {
  search: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['all', 'owned', 'reading', 'wishlist']).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
};
