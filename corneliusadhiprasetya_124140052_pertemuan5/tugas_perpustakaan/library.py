"""Kelas untuk mengelola koleksi item perpustakaan."""

from library_item import LibraryItem


class Library:
    """Simpan, tampilkan, dan cari item perpustakaan."""

    def __init__(self, name):
        """Buat perpustakaan dengan koleksi item kosong.

        Args:
            name (str): Nama perpustakaan.
        """
        self.name = name
        self.__koleksi = {}

    def tambah_item(self, item):
        """Tambahkan item jika tipenya valid dan ID belum digunakan.

        Args:
            item (LibraryItem): Item buku atau majalah yang akan ditambahkan.

        Returns:
            bool: True jika item ditambahkan, selain itu False.
        """
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan turunan LibraryItem.")
        if item.item_id in self.__koleksi:
            return False
        self.__koleksi[item.item_id] = item
        return True

    def daftar_item_tersedia(self):
        """Ambil seluruh item yang saat ini tersedia.

        Returns:
            list[LibraryItem]: Daftar item yang tidak sedang dipinjam.
        """
        return [item for item in self.__koleksi.values() if item.tersedia]

    def cari_berdasarkan_id(self, item_id):
        """Cari satu item berdasarkan ID.

        Args:
            item_id (str): ID item yang dicari.

        Returns:
            LibraryItem | None: Item yang cocok, atau None jika tidak
                ditemukan.
        """
        return self.__koleksi.get(item_id)

    def cari_berdasarkan_judul(self, title):
        """Cari item yang judulnya mengandung teks pencarian.

        Args:
            title (str): Kata atau judul yang dicari, tanpa membedakan kapital.

        Returns:
            list[LibraryItem]: Semua item dengan judul yang cocok.
        """
        query = title.casefold().strip()
        if not query:
            return []
        return [
            item
            for item in self.__koleksi.values()
            if query in item.title.casefold()
        ]
