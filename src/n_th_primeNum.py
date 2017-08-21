def primeN(n):
    if n == 1:
        return 1
    elif n == 2:
        return 2
    elif n > 2:
        v = 2
        value = 3
        while n > 2:
            if value <= v:
                 n -= 1
                 value += 1
                 v = 2
            else :
                if value % v is not 0:
                    v += 1
                else:
                    value += 1
        return value - 1
    else:
        return 0

print(primeN(7))