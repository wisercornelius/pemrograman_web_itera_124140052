import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import App from './App';

function renderApp() {
  window.history.pushState({}, '', '/');
  return render(
    <BookProvider>
      <BrowserRouter><App /></BrowserRouter>
    </BookProvider>,
  );
}

async function addBook(user, { title = 'Laut Bercerita', author = 'Leila S. Chudori', status = 'reading' } = {}) {
  await user.type(screen.getByLabelText('Judul buku'), title);
  await user.type(screen.getByLabelText('Nama penulis'), author);
  await user.selectOptions(screen.getByLabelText('Status membaca'), status);
  await user.click(screen.getByRole('button', { name: /tambahkan buku/i }));
}

describe('Aplikasi Ruang Baca', () => {
  it('menampilkan koleksi kosong dan navigasi utama', () => {
    renderApp();
    expect(screen.getByRole('heading', { name: /rak bukumu/i })).toBeInTheDocument();
    expect(screen.getByText(/cerita pertamamu dimulai di sini/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Statistik' })).toBeInTheDocument();
  });

  it('menampilkan validasi saat kolom wajib belum diisi', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole('button', { name: /tambahkan buku/i }));
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Pilih status buku.')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul buku')).toHaveAttribute('aria-invalid', 'true');
  });

  it('menambahkan buku dan menyimpannya ke localStorage', async () => {
    const user = userEvent.setup();
    renderApp();
    await addBook(user);
    expect(screen.getByRole('heading', { name: 'Laut Bercerita' })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('ruang-baca-books'))).toHaveLength(1);
  });

  it('mencari buku berdasarkan nama penulis', async () => {
    const user = userEvent.setup();
    renderApp();
    await addBook(user);
    await addBook(user, { title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', status: 'owned' });
    await user.type(screen.getByRole('searchbox', { name: 'Cari judul atau penulis' }), 'pramoedya');
    expect(screen.getByRole('heading', { name: 'Bumi Manusia' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Laut Bercerita' })).not.toBeInTheDocument();
  });

  it('memfilter daftar berdasarkan status', async () => {
    const user = userEvent.setup();
    renderApp();
    await addBook(user);
    await addBook(user, { title: 'Bumi Manusia', author: 'Pramoedya', status: 'owned' });
    await user.click(screen.getByRole('button', { name: 'Dimiliki' }));
    expect(screen.getByRole('heading', { name: 'Bumi Manusia' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Laut Bercerita' })).not.toBeInTheDocument();
  });

  it('mengedit informasi buku', async () => {
    const user = userEvent.setup();
    renderApp();
    await addBook(user);
    await user.click(screen.getByRole('button', { name: 'Edit Laut Bercerita' }));
    const titleInput = screen.getByLabelText('Judul buku');
    await user.clear(titleInput);
    await user.type(titleInput, 'Pulang');
    await user.click(screen.getByRole('button', { name: /simpan perubahan/i }));
    expect(screen.getByRole('heading', { name: 'Pulang' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Laut Bercerita' })).not.toBeInTheDocument();
  });

  it('menghapus buku dari koleksi', async () => {
    const user = userEvent.setup();
    renderApp();
    await addBook(user);
    await user.click(screen.getByRole('button', { name: 'Hapus Laut Bercerita' }));
    expect(screen.queryByRole('heading', { name: 'Laut Bercerita' })).not.toBeInTheDocument();
    expect(screen.getByText(/cerita pertamamu dimulai di sini/i)).toBeInTheDocument();
  });

  it('menampilkan rekap jumlah pada halaman statistik', async () => {
    const user = userEvent.setup();
    renderApp();
    await addBook(user);
    await user.click(screen.getByRole('link', { name: 'Statistik' }));
    const readingCard = screen.getByText('SEDANG DIBACA').closest('article');
    expect(within(readingCard).getByText('1')).toBeInTheDocument();
    const totalCard = screen.getByText('SELURUH KOLEKSI').parentElement;
    expect(totalCard.querySelector('.stats-total-number')).toHaveTextContent('1 buku');
  });
});
