"""Model anggota perpustakaan dan pencatatan peminjaman item."""

from library_item import LibraryItem


class Member:
    """Anggota yang dapat meminjam dan mengembalikan item."""

    def __init__(self, member_id, name):
        """Buat anggota dengan ID dan nama.

        Args:
            member_id (str): ID unik anggota.
            name (str): Nama lengkap anggota.
        """
        if not member_id.strip() or not name.strip():
            raise ValueError("ID dan nama anggota tidak boleh kosong.")
        self.__member_id = member_id.strip()
        self.__name = name.strip()
        self.__borrowed_item_ids = set()

    @property
    def member_id(self):
        """str: ID anggota yang hanya dapat dibaca."""
        return self.__member_id

    @property
    def name(self):
        """str: Nama anggota yang hanya dapat dibaca."""
        return self.__name

    @property
    def borrowed_item_ids(self):
        """tuple[str, ...]: Salinan ID item yang sedang dipinjam."""
        return tuple(sorted(self.__borrowed_item_ids))

    def pinjam(self, item):
        """Pinjam item jika item tersedia.

        Args:
            item (LibraryItem): Item yang akan dipinjam.

        Returns:
            bool: True jika berhasil dipinjam, selain itu False.
        """
        if not isinstance(item, LibraryItem) or not item.pinjam():
            return False
        self.__borrowed_item_ids.add(item.item_id)
        return True

    def kembalikan(self, item):
        """Kembalikan item yang tercatat dipinjam oleh anggota.

        Args:
            item (LibraryItem): Item yang akan dikembalikan.

        Returns:
            bool: True jika berhasil dikembalikan, selain itu False.
        """
        if item.item_id not in self.__borrowed_item_ids:
            return False
        if not item.kembalikan():
            return False
        self.__borrowed_item_ids.remove(item.item_id)
        return True
