"""Contoh enkapsulasi saldo rekening dengan atribut private."""


class RekeningBank:
    """Rekening bank sederhana yang menjaga saldo tetap valid."""

    def __init__(self, pemilik, saldo_awal=0):
        """Buat rekening dengan saldo awal.

        Args:
            pemilik (str): Nama pemilik rekening.
            saldo_awal (int | float): Saldo awal non-negatif.
        """
        if saldo_awal < 0:
            raise ValueError("Saldo awal tidak boleh negatif.")
        self.pemilik = pemilik
        self.__saldo = saldo_awal

    @property
    def saldo(self):
        """int | float: Saldo rekening yang hanya dapat dibaca."""
        return self.__saldo

    def setor(self, jumlah):
        """Tambahkan sejumlah uang ke saldo.

        Args:
            jumlah (int | float): Jumlah setoran positif.

        Returns:
            int | float: Saldo setelah setoran.
        """
        if jumlah <= 0:
            raise ValueError("Jumlah setoran harus lebih dari nol.")
        self.__saldo += jumlah
        return self.__saldo

    def tarik(self, jumlah):
        """Tarik uang jika saldo mencukupi.

        Args:
            jumlah (int | float): Jumlah penarikan positif.

        Returns:
            bool: True jika penarikan berhasil, selain itu False.
        """
        if jumlah <= 0 or jumlah > self.__saldo:
            return False
        self.__saldo -= jumlah
        return True


def main():
    """Demonstrasikan akses saldo melalui property dan method."""
    rekening = RekeningBank("Cornelius", 100000)
    rekening.setor(50000)
    rekening.tarik(25000)
    print("=== Encapsulation ===")
    print(f"Pemilik: {rekening.pemilik}")
    print(f"Saldo akhir: Rp{rekening.saldo:,.0f}")


if __name__ == "__main__":
    main()
