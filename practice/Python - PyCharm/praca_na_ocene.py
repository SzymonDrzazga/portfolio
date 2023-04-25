x = True
y = True
while x:
    figura = str(input("Czego pole chcesz obliczyć? [kwadrat][prostokąt][trójkąt]: "))
    if figura == "kwadrat" or figura == "Kwadrat":
        a = float(input("Podaj wartość pierwszego boku: "))
        if a < 0:
            print("Oczekuje większej wartości niż 0?")
        else:
            print("Pole tej Figury to: " + str(a * a))
    elif figura == "prostokąt" or figura == "Prostokąt" or figura == "prostokat" or figura == "Prostokat":
        a = float(input("Podaj wartość pierwszego boku: "))
        b = float(input("Podaj wartość drugiego boku: "))
        if a < 0 or b < 0:
            print("Oczekuje większej wartości niż 0?")
        else:
            print("Pole tej Figury to: " + str(a * b))
    elif figura == "trójkąt" or figura == "Trójkąt" or figura == "trojkat" or figura == "Trojkat":
        a = float(input("Podaj wartość podstawy trójkąta: "))
        b = float(input("Podaj wartość wysokości trójkąta: "))
        if a < 0 or b < 0:
            print("Oczekuje większej wartości niż 0?")
        else:
            print("Pole tej Figury to: " + str(a * b / 2))
    else:
        print("Źle wprowadzono dane")
    x_1 = str(input("Chcesz wykonać działanie ponownie? [tak][nie]: "))
    while y:
        if x_1 == "tak" or x_1 == "Tak":
            x = True
            y = False
        elif x_1 == "nie" or x_1 == "Nie":
            x = False
            y = False
        else:
            print("Nie rozumiem")
            y = True
