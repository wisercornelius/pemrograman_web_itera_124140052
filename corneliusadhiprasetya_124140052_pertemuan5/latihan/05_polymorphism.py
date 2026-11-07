"""Contoh polymorphism melalui method luas pada bentuk berbeda."""


class Persegi:
    """Persegi dengan method luas."""

    def __init__(self, sisi):
        """Buat persegi.

        Args:
            sisi (float): Panjang sisi persegi.
        """
        self.sisi = sisi

    def luas(self):
        """Hitung luas persegi.

        Returns:
            float: Luas persegi.
        """
        return self.sisi**2


class PersegiPanjang:
    """Persegi panjang dengan method luas yang sama."""

    def __init__(self, panjang, lebar):
        """Buat persegi panjang.

        Args:
            panjang (float): Panjang persegi panjang.
            lebar (float): Lebar persegi panjang.
        """
        self.panjang = panjang
        self.lebar = lebar

    def luas(self):
        """Hitung luas persegi panjang.

        Returns:
            float: Luas persegi panjang.
        """
        return self.panjang * self.lebar


def main():
    """Panggil method yang sama pada objek dari kelas berbeda."""
    bentuk = [Persegi(4), PersegiPanjang(5, 3)]
    print("=== Polymorphism ===")
    for item in bentuk:
        print(f"{type(item).__name__}: luas = {item.luas()}")


if __name__ == "__main__":
    main()
