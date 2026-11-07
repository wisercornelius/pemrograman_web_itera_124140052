"""Program sederhana untuk menghitung indeks massa tubuh (BMI)."""


def tentukan_kategori_bmi(bmi):
    """Tentukan kategori berat badan dari nilai BMI.

    Args:
        bmi (float): Nilai indeks massa tubuh.

    Returns:
        str: Kategori berat badan.
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    """Hitung dan tampilkan BMI menggunakan data contoh.

    Returns:
        None
    """
    berat_kg = 68
    tinggi_m = 1.72

    bmi = berat_kg / (tinggi_m * tinggi_m)
    kategori = tentukan_kategori_bmi(bmi)

    print("=== Program Penghitung BMI ===")
    print(f"Berat badan : {berat_kg:.1f} kg")
    print(f"Tinggi badan: {tinggi_m:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()
