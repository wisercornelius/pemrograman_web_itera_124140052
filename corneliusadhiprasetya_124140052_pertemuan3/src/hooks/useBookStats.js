import { useMemo } from 'react';

export default function useBookStats(books) {
  return useMemo(() => {
    const counts = books.reduce((result, book) => {
      result[book.status] += 1;
      return result;
    }, { owned: 0, reading: 0, wishlist: 0 });

    return { total: books.length, ...counts };
  }, [books]);
}
