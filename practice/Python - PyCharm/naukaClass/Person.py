class Person:
    def __init__(self, imie, nazwisko):
        self.imie = imie
        self.nazwisko = nazwisko

    def presonalInfo(self):
        print("My name is: " + self.imie + " " + self.nazwisko)
