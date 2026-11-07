"""Bandingkan perhitungan luas prosedural dan berorientasi objek."""


def hitung_luas_persegi(sisi):
    """Hitung luas persegi secara prosedural.

    Args:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Luas persegi.
    """
    return sisi * sisi


class Persegi:
    """Representasi persegi menggunakan pendekatan object-oriented."""

    def __init__(self, sisi):
        """Buat persegi dengan panjang sisi tertentu.

        Args:
            sisi (float): Panjang sisi persegi.
        """
        self.sisi = sisi

    def hitung_luas(self):
        """Hitung luas persegi dari atribut objek.

        Returns:
            float: Luas persegi.
        """
        return self.sisi**2


def main():
    """Cetak perbandingan hasil dua pendekatan."""
    sisi = 4
    persegi = Persegi(sisi)
    print("=== Prosedural vs OOP ===")
    print(f"Luas (prosedural): {hitung_luas_persegi(sisi)}")
    print(f"Luas (OOP)       : {persegi.hitung_luas()}")


if __name__ == "__main__":
    main()
