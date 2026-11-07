"""Contoh abstract class dan implementasi method abstract."""

from abc import ABC, abstractmethod


class Hewan(ABC):
    """Kelas abstrak hewan yang mewajibkan implementasi bersuara."""

    @abstractmethod
    def bersuara(self):
        """Kembalikan suara khusus dari hewan turunan.

        Returns:
            str: Suara hewan.
        """
        raise NotImplementedError


class Anjing(Hewan):
    """Implementasi Hewan untuk anjing."""

    def bersuara(self):
        """Kembalikan suara anjing.

        Returns:
            str: Suara gonggongan.
        """
        return "guk guk"


class Kucing(Hewan):
    """Implementasi Hewan untuk kucing."""

    def bersuara(self):
        """Kembalikan suara kucing.

        Returns:
            str: Suara meongan.
        """
        return "meong"


def main():
    """Cetak suara dari beberapa implementasi kelas abstrak."""
    hewan = [Anjing(), Kucing()]
    print("=== Abstract Class ===")
    for item in hewan:
        print(f"{type(item).__name__}: {item.bersuara()}")


if __name__ == "__main__":
    main()
