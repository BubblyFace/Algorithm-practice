import sys

for line in sys.stdin:
    #输入
    str = line.split()[0]
    lenth,max = int(0),int(0)
    for i in range(0,len(str)-1):
        if str[i] != str[i+1]:
            lenth += 1
            if lenth > max:
                max = lenth
        else:
            lenth = 0
    print(max+1)
