def fib_fun(n):
    if n == 1 or n == 2:
        return 1
    else:
        return fib_fun(n - 1) + fib_fun(n - 2)
    return 0


print(fib_fun(4))