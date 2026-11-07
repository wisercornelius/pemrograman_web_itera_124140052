"""Program utama untuk menguji fungsi pada modul math_operations."""

import math_operations
from math_operations import (
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
    keliling_lingkaran,
    keliling_persegi,
    keliling_persegi_panjang,
    luas_lingkaran,
    luas_persegi,
    luas_persegi_panjang,
)


def main():
    """Tampilkan hasil pengujian seluruh fungsi matematika.

    Returns:
        None
    """
    sisi = 5
    panjang = 8
    lebar = 3
    jari_jari = 7
    suhu_celsius = 25

    print("=== Hasil Perhitungan Geometri ===")
    print(f"Persegi (sisi {sisi})")
    print(f"  Luas      : {luas_persegi(sisi):.2f}")
    print(f"  Keliling  : {keliling_persegi(sisi):.2f}")
    print(f"Persegi panjang ({panjang} x {lebar})")
    print(f"  Luas      : {luas_persegi_panjang(panjang, lebar):.2f}")
    print(
        "  Keliling  : "
        f"{keliling_persegi_panjang(panjang, lebar):.2f}"
    )
    print(f"Lingkaran (jari-jari {jari_jari}, PI={math_operations.PI})")
    print(f"  Luas      : {luas_lingkaran(jari_jari):.2f}")
    print(f"  Keliling  : {keliling_lingkaran(jari_jari):.2f}")

    print("\n=== Hasil Konversi Suhu ===")
    print(
        f"{suhu_celsius}°C ke Fahrenheit: "
        f"{celsius_ke_fahrenheit(suhu_celsius):.2f}°F"
    )
    print(
        f"{suhu_celsius}°C ke Kelvin    : "
        f"{celsius_ke_kelvin(suhu_celsius):.2f} K"
    )


if __name__ == "__main__":
    main()
