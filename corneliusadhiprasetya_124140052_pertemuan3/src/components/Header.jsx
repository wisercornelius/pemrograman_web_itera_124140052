import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand" to="/" aria-label="Ruang Baca, halaman koleksi">
          <span>ruang<span className="brand-light">baca</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Navigasi utama">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Koleksi</NavLink>
          <NavLink to="/statistik" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Statistik</NavLink>
        </nav>

      </div>
    </header>
  );
}

Header.propTypes = {};
