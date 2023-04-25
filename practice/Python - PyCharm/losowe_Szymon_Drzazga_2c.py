import random


while True:
    s = random.randint(1, 100)
    while True:
        y = input("Podaj liczbe od 1 do 100: ")
        if y == "":
            continue
        if int(y) == s:
            break
        if int(y) < s:
            print("Wiecej")
        if int(y) > s:
            print("Mniej")

    print("Gratulacje to poprawna liczba :)\n")
    powtorz = input("chcesz zagrac ponownie? [t][n] :")
    if powtorz == "t":
        print("\n\n\n\n")
        continue
    if powtorz == "n":
        break
