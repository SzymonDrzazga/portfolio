statement = True
suma = 0
ujemne = 0
powtorzenia = 0
a = 101
while statement:
    i = int(input("Podaj Liczbe: "))
    powtorzenia += 1
    if i < 0:
        ujemne += 1
    suma += i
    if suma > 100:
        print("Suma liczb przekroczyla liczbe 100, koniec programu...")
        statement = False
    if ujemne >= 10:
        print("Ilosc liczb ujemnych przekroczyla liczbe 10, koniec programu...")

    if i == a:
        print("Podana liczba powtorzyla sie dwa razu pod rzad, koniec programu...")
        statement = False
    else:
        a = i
print("Srednia arytmetyczna podanych liczb to: " + str(suma / powtorzenia))
