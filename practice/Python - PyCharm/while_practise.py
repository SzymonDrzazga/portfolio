
first_number = int(input("Podaj liczbę: "))

x = True
ilosc_petli = 1

while x:
    y = str(input("Czy chcesz podać kolejną liczbę?  [T][N]: "))
    if y == "T" or y == "t" or y == "Tak" or y == "tak" :
        liczba = int(input("Podaj liczbę: "))
        first_number += int(liczba)
        ilosc_petli += 1
        x = True
    if y == "N" or y == "n" or y == "Nie" or y == "nie" :
        print("Suma podanych liczb to: " + str(first_number))
        print("A średnia arytmetyczna podanych liczb to: " + str(first_number / ilosc_petli))
        x = False


while mul_sum <= :
    mul_sum = num[0]
    mul_sum *= num[i+1]
# print()