"""Jalankan demo sistem manajemen perpustakaan."""

from library import Library
from library_item import Book, Magazine
from member import Member


def tampilkan_katalog(library):
    """Cetak katalog item yang tersedia di perpustakaan.

    Args:
        library (Library): Perpustakaan yang katalog itemnya ditampilkan.

    Returns:
        None
    """
    items = library.daftar_item_tersedia()
    if not items:
        print("Belum ada item yang tersedia.")
        return

    for item in items:
        print(f"- {item.get_detail()}")


def main():
    """Demonstrasikan penambahan, pencarian, katalog, dan peminjaman."""
    library = Library("Perpustakaan ITERA")
    book_python = Book("B001", "Belajar Python", "A. Nugroho", 2024)
    book_oop = Book("B002", "Pemrograman Berorientasi Objek", "S. Putri", 2023)
    magazine = Magazine("M001", "Teknologi Hari Ini", 12, "Mei 2025")

    print(f"=== {library.name} ===")
    print("\nTambah item:")
    for item in (book_python, book_oop, magazine):
        result = library.tambah_item(item)
        status = "berhasil" if result else "gagal"
        print(f"- {item.item_id} ({item.title}): {status}")

    print("\nKatalog item tersedia:")
    tampilkan_katalog(library)

    print("\nCari berdasarkan ID B001:")
    found_item = library.cari_berdasarkan_id("B001")
    if found_item:
        print(f"- {found_item.get_detail()}")
    else:
        print("- Item tidak ditemukan.")

    print("\nCari judul dengan kata 'python':")
    for item in library.cari_berdasarkan_judul("python"):
        print(f"- {item.get_detail()}")

    member = Member("A001", "Cornelius Adhi Prasetya")
    print(f"\nPeminjaman oleh {member.name}:")
    print(f"- Pinjam {book_python.item_id}: "
          f"{'berhasil' if member.pinjam(book_python) else 'gagal'}")
    print(f"- Status {book_python.item_id}: "
          f"{'dipinjam' if book_python.is_dipinjam else 'tersedia'}")

    print("\nKatalog setelah peminjaman:")
    tampilkan_katalog(library)

    print(f"\nPengembalian {book_python.item_id}: "
          f"{'berhasil' if member.kembalikan(book_python) else 'gagal'}")
    print(f"- Status {book_python.item_id}: "
          f"{'dipinjam' if book_python.is_dipinjam else 'tersedia'}")


if __name__ == "__main__":
    main()
