# = int(raw_input().strip())
#items = [int(x) for x in raw_input().strip().split()]

line = input()
line2 = input()
n = int(line.split()[0])
items = line2.split()


def get_palindrome(L):
    if n == 1:
        return 0
    if n == 0:
        return 0
    max_num = 0
    i, j = 0, n - 1
    while i < j:
        if int(L[i]) < int(L[j]):
            L[i + 1] = int(L[i + 1]) + int(L[i])
            max_num += 1
            i += 1
        elif int(L[i]) > int(L[j]):
            L[j - 1] = int(L[j - 1]) + int(L[j])
            max_num += 1
            j -= 1
        elif int(L[i]) == int(L[j]):
            i += 1
            j -= 1
        else:
            break
    return max_num


print(get_palindrome(items))