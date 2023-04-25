import random

# text = "('','','','','',''),"
dictionary = {
    "1.5": "1+",
    "2.5": "3-",
    "3.5": "4-",
    "4.5": "5-",
    "5.5": "5+",
}
nana = 0

for uczen in range(12):
    for klasa in range(5):
        for przedmiot in range(5):
            nana += 1
            a = (random.randint(2, 12) / 2)
            b = random.randint(1, 4)
            if a % 1 == 0:
                c = int(a)
            else:
                # c = f"{a}"
                c = dictionary[str(a)]
                # print(index[str(a)])

            print(f"('{nana}','{uczen+2}','{przedmiot+1}','{c}','{float(a)}','{b}'),")
