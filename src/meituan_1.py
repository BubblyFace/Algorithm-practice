import sys 


def findKinds(num):
    sum = 0
    i = 1 
    if num == 1:
        sum += 1
    else:
        while i < num:
            sum = findKinds(i) + findKinds(num - i)
            i += 1 
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

    print(findKinds(sysNum))