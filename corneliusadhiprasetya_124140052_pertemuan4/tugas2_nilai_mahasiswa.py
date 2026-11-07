"""Menghitung nilai akhir, grade, dan peringkat mahasiswa."""

mahasiswa = [
    {
        "nama": "Aditya Pratama",
        "nim": "124140052",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88,
    },
    {
        "nama": "Bella Anindya",
        "nim": "124140061",
        "nilai_uts": 76,
        "nilai_uas": 82,
        "nilai_tugas": 80,
    },
    {
        "nama": "Citra Maharani",
        "nim": "124140074",
        "nilai_uts": 65,
        "nilai_uas": 70,
        "nilai_tugas": 75,
    },
    {
        "nama": "Dimas Saputra",
        "nim": "124140089",
        "nilai_uts": 55,
        "nilai_uas": 60,
        "nilai_tugas": 58,
    },
    {
        "nama": "Eka Wulandari",
        "nim": "124140095",
        "nilai_uts": 40,
        "nilai_uas": 45,
        "nilai_tugas": 50,
    },
]


def hitung_nilai_akhir(data_mahasiswa):
    """Hitung nilai akhir mahasiswa berdasarkan bobot penilaian.

    Args:
        data_mahasiswa (dict): Data mahasiswa dengan nilai UTS, UAS,
            dan tugas.

    Returns:
        float: Nilai akhir berbobot.
    """
    return (
        0.30 * data_mahasiswa["nilai_uts"]
        + 0.40 * data_mahasiswa["nilai_uas"]
        + 0.30 * data_mahasiswa["nilai_tugas"]
    )


def tentukan_grade(nilai_akhir):
    """Tentukan grade berdasarkan nilai akhir.

    Args:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Returns:
        str: Grade dari A sampai E.
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def main():
    """Hitung nilai mahasiswa dan tampilkan tabel serta nilai ekstrem.

    Returns:
        None
    """
    for data in mahasiswa:
        data["nilai_akhir"] = hitung_nilai_akhir(data)
        data["grade"] = tentukan_grade(data["nilai_akhir"])

    print("=== Data Nilai Mahasiswa ===")
    print(f"{'Nama':<20} {'NIM':<12} {'Nilai Akhir':>12} {'Grade':>7}")
    print("-" * 55)
    for data in mahasiswa:
        print(
            f"{data['nama']:<20} {data['nim']:<12} "
            f"{data['nilai_akhir']:>12.2f} {data['grade']:>7}"
        )

    nilai_tertinggi = max(data["nilai_akhir"] for data in mahasiswa)
    nilai_terendah = min(data["nilai_akhir"] for data in mahasiswa)
    mahasiswa_tertinggi = [
        data for data in mahasiswa if data["nilai_akhir"] == nilai_tertinggi
    ]
    mahasiswa_terendah = [
        data for data in mahasiswa if data["nilai_akhir"] == nilai_terendah
    ]

    print("\n=== Nilai Tertinggi ===")
    for data in mahasiswa_tertinggi:
        print(f"{data['nama']} ({data['nim']}): {nilai_tertinggi:.2f}")

    print("\n=== Nilai Terendah ===")
    for data in mahasiswa_terendah:
        print(f"{data['nama']} ({data['nim']}): {nilai_terendah:.2f}")


if __name__ == "__main__":
    main()
