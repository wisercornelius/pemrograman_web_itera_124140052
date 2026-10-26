import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <main className="page-shell not-found"><p className="eyebrow">HALAMAN TIDAK DITEMUKAN</p><h1>Sepertinya halaman ini <em>terselip.</em></h1><Link className="button button-primary" to="/">Kembali ke rak buku ↗</Link></main>;
}

NotFound.propTypes = {};
