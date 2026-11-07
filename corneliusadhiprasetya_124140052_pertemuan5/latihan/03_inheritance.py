"""Contoh pewarisan kelas dan method overriding."""


class Hewan:
    """Kelas dasar untuk semua hewan."""

    def __init__(self, nama):
        """Buat hewan dengan nama.

        Args:
            nama (str): Nama hewan.
        """
        self.nama = nama

    def bersuara(self):
        """Kembalikan suara umum hewan.

        Returns:
            str: Deskripsi suara hewan.
        """
        return "mengeluarkan suara"


class Kucing(Hewan):
    """Kucing mewarisi identitas dari kelas Hewan."""

    def bersuara(self):
        """Kembalikan suara khusus kucing.

        Returns:
            str: Suara kucing.
        """
        return "mengeong"


def main():
    """Tampilkan penggunaan kelas turunan."""
    kucing = Kucing("Milo")
    print("=== Inheritance ===")
    print(
        f"{kucing.nama} adalah {type(kucing).__name__} "
        f"dan {kucing.bersuara()}."
    )


if __name__ == "__main__":
    main()
