from Person import Person

class Prezes(Person):
    def __init__(self, firma, imie, nazwisko):
        super().__init__(imie, nazwisko)
        self.firma = firma

    def getNazwaFirmy(self):
        return self.firma