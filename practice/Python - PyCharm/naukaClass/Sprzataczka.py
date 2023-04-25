from Person import Person

class Sprzataczka(Person):
    def __init__(self, l_miotel, imie, nazwisko):
        super().__init__(imie, nazwisko)
        self.l_miotel = l_miotel


    def getLiczbaMiotel(self):
        return self.l_miotel
