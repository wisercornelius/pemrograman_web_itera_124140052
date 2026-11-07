"""Kelas abstrak dan jenis item yang tersedia di perpustakaan."""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Kelas dasar abstrak untuk semua item perpustakaan."""

    def __init__(self, item_id, title):
        """Buat item dengan ID unik dan judul.

        Args:
            item_id (str): Identitas unik item.
            title (str): Judul item.
        """
        if not item_id.strip():
            raise ValueError("ID item tidak boleh kosong.")
        self.__item_id = item_id.strip()
        self.title = title
        self._is_borrowed = False

    @property
    def item_id(self):
        """str: ID unik yang hanya dapat dibaca."""
        return self.__item_id

    @property
    def title(self):
        """str: Judul item."""
        return self.__title

    @title.setter
    def title(self, value):
        """Atur judul setelah memastikan nilainya tidak kosong.

        Args:
            value (str): Judul baru item.
        """
        if not value.strip():
            raise ValueError("Judul item tidak boleh kosong.")
        self.__title = value.strip()

    @property
    def is_dipinjam(self):
        """bool: True jika item sedang dipinjam."""
        return self._is_borrowed

    @property
    def tersedia(self):
        """bool: True jika item tersedia untuk dipinjam."""
        return not self._is_borrowed

    def pinjam(self):
        """Tandai item sedang dipinjam.

        Returns:
            bool: True jika peminjaman berhasil, selain itu False.
        """
        if self._is_borrowed:
            return False
        self._is_borrowed = True
        return True

    def kembalikan(self):
        """Tandai item telah dikembalikan.

        Returns:
            bool: True jika pengembalian berhasil, selain itu False.
        """
        if not self._is_borrowed:
            return False
        self._is_borrowed = False
        return True

    @abstractmethod
    def get_detail(self):
        """Kembalikan deskripsi khusus untuk jenis item.

        Returns:
            str: Deskripsi item.
        """
        raise NotImplementedError


class Book(LibraryItem):
    """Item buku dengan informasi penulis dan tahun terbit."""

    def __init__(self, item_id, title, author, year):
        """Buat buku.

        Args:
            item_id (str): ID unik buku.
            title (str): Judul buku.
            author (str): Nama penulis.
            year (int): Tahun terbit.
        """
        super().__init__(item_id, title)
        self.__author = author.strip()
        self.__year = year

    def get_detail(self):
        """Kembalikan detail buku sebagai teks.

        Returns:
            str: ID, judul, penulis, dan tahun terbit buku.
        """
        return (
            f"[Buku] ID: {self.item_id} | Judul: {self.title} | "
            f"Penulis: {self.__author} | Tahun: {self.__year}"
        )


class Magazine(LibraryItem):
    """Item majalah dengan informasi nomor edisi dan bulan terbit."""

    def __init__(self, item_id, title, issue_number, month):
        """Buat majalah.

        Args:
            item_id (str): ID unik majalah.
            title (str): Judul majalah.
            issue_number (int): Nomor edisi majalah.
            month (str): Bulan terbit.
        """
        super().__init__(item_id, title)
        self.__issue_number = issue_number
        self.__month = month.strip()

    def get_detail(self):
        """Kembalikan detail majalah sebagai teks.

        Returns:
            str: ID, judul, edisi, dan bulan terbit majalah.
        """
        return (
            f"[Majalah] ID: {self.item_id} | Judul: {self.title} | "
            f"Edisi: {self.__issue_number} | Bulan: {self.__month}"
        )
