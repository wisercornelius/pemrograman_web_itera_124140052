import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('ruang-baca-books', []);

  const addBook = (bookData) => {
    const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const book = { ...bookData, id, createdAt: Date.now() };
    setBooks((current) => [book, ...current]);
    return book;
  };

  const updateBook = (id, updates) => {
    setBooks((current) => current.map((book) => (
      book.id === id ? { ...book, ...updates } : book
    )));
  };

  const deleteBook = (id) => {
    setBooks((current) => current.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = { children: PropTypes.node.isRequired };

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBooks harus digunakan di dalam BookProvider.');
  return context;
}
