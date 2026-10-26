import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistik" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

App.propTypes = {};
