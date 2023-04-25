def add(a, b):
    answer = a + b
    print(str(a) + " + " + str(b) + " = " + str(answer) + "\n" + "\n" + "\n")


def sub(a, b):
    answer = a - b
    print(str(a) + " - " + str(b) + " = " + str(answer) + "\n" + "\n" + "\n")


def mul(a, b):
    answer = a * b
    print(str(a) + " * " + str(b) + " = " + str(answer) + "\n" + "\n" + "\n")


def div(a, b):
    answer = a / b
    print(str(a) + " / " + str(b) + " = " + str(answer) + "\n" + "\n" + "\n")


while True:

    print("A. Addition")
    print("B. Subtraction")
    print("C. Multiplication")
    print("D. Division")
    print("E. Exit")

    choice = input("input your choice: ")

    if choice == "a" or choice == "A" or choice == "Addition" or choice == "addition":
        print("\n" + "Addition")
        a = int(input("Input your first number: "))
        b = int(input("Input your second number: "))
        add(a, b)

    if choice == "b" or choice == "B" or choice == "Subtraction" or choice == "subtraction":
        print("\n" + "Subtraction")
        a = int(input("Input your first number: "))
        b = int(input("Input your second number: "))
        sub(a, b)

    if choice == "c" or choice == "C" or choice == "Multiplication" or choice == "multiplication":
        print("\n" + "Multiplication")
        a = int(input("Input your first number: "))
        b = int(input("Input your second number: "))
        mul(a, b)

    if choice == "d" or choice == "D" or choice == "Division" or choice == "division":
        print("\n" + "Division")
        a = int(input("Input your first number: "))
        b = int(input("Input your second number: "))
        div(a, b)

    if choice == "e" or choice == "E" or choice == "Exit" or choice == "exit":
        print("\n" + "The End")
        quit()

