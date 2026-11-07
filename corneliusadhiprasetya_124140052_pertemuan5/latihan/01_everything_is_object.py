"""Demonstrasi bahwa nilai dan fungsi di Python adalah objek."""


def sapa(nama):
    """Buat salam untuk nama yang diberikan.

    Args:
        nama (str): Nama orang yang disapa.

    Returns:
        str: Kalimat salam.
    """
    return f"Halo, {nama}!"


def main():
    """Tampilkan tipe dan perilaku beberapa objek Python."""
    angka = 42
    angka_alias = angka
    daftar = ["buku", "majalah"]
    daftar_alias = daftar

    print("=== Everything Is an Object ===")
    print(f"angka bertipe: {type(angka).__name__}")
    print(f"sapa bertipe: {type(sapa).__name__}")
    print(f"angka_alias sama dengan angka: {angka_alias is angka}")
    print(f"daftar_alias menunjuk objek yang sama: {daftar_alias is daftar}")
    print(sapa("Mahasiswa"))


if __name__ == "__main__":
    main()
