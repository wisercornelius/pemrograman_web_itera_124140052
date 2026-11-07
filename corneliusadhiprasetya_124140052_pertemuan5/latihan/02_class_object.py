"""Contoh sederhana class dan object menggunakan data mahasiswa."""


class Mahasiswa:
    """Simpan identitas mahasiswa dan tampilkan ringkasannya."""

    def __init__(self, nama, nim):
        """Inisialisasi objek mahasiswa.

        Args:
            nama (str): Nama mahasiswa.
            nim (str): Nomor induk mahasiswa.
        """
        self.nama = nama
        self.nim = nim

    def perkenalan(self):
        """Kembalikan teks perkenalan mahasiswa.

        Returns:
            str: Nama dan NIM mahasiswa.
        """
        return f"Nama: {self.nama} | NIM: {self.nim}"


def main():
    """Buat dan tampilkan beberapa objek mahasiswa."""
    mahasiswa = [
        Mahasiswa("Cornelius Adhi Prasetya", "124140052"),
        Mahasiswa("Ayu Lestari", "124140060"),
    ]
    print("=== Class dan Object ===")
    for orang in mahasiswa:
        print(orang.perkenalan())


if __name__ == "__main__":
    main()
