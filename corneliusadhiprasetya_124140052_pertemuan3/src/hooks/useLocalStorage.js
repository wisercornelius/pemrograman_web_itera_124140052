import { useEffect, useState } from 'react';

// Menjaga state React tetap sinkron dengan penyimpanan browser.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Data buku tidak dapat disimpan di localStorage.', error);
    }
  }, [key, value]);

  return [value, setValue];
}
