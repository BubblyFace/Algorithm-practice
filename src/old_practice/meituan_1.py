import sys 


def findKinds(num):
    sum = 0
    i = 1 
    if num == 1:
        sum += 1
        return sum
    if num == 2:
        sum = 2
        return sum
    else:
        for i in range(1, num):
            sum += findKinds(i)
        sum += 1
    return sum
for line in sys.stdin:
    sysIn = line.split()
    if len(sysIn) > 1:
    #    return False
        print("False1")


    sysNum  = int(sysIn[0])
    if sysNum < 0 or sysNum > 6 :
    #    return False
        print("False2")

print(findKinds(6))