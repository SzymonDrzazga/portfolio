import math

x = True
while x:
    result = ""
    y = int(input("Podaj liczbe: "))

    # best way to do so:
    #   print(bin(y))

    imporant1 = math.ceil(math.log(y, 2))
    k = int(str("1"*imporant1))
    onemore = 1

    for i in range(imporant1):
        if y & onemore:
            result += "1"
        else:
            result += "0"
        onemore <<= 1

    print(result[::-1])

    z = str(input("want to continue? [y][n]"))
    if z == "y":
        continue
    elif z == "n":
        break

