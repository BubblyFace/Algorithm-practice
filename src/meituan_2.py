#greedy
#给你六种面额 1、5、10、20、50、100 元的纸币，假设每种币值的数量都足够多，编写程序求组成N元（N为0~10000的非负整数）的不同组合的个数。
import sys 

def count(num):
    if num < 0:
        return 0
    counts = list(range(0,num+1))
    counts[0] = 1
    moneys = [1, 5, 10, 20, 50, 100]
    for i in list(range(0,len(moneys))):
        for j in list(range(moneys[i],num+1)):
            counts[j] = counts[j] + counts[j - moneys[i]]
    return counts[num]

for line in sys.stdin:
    sysIn = line.split()
    sysNum = int(sysIn[0])
    # if len(sysIn) > 1:
    # #    return False
    #     print("False1")
    # sysNum  = int(sysIn[0])
    # if sysNum < 0 or sysNum > 6 :
    # #    return False
    #     print("False2")
    print(count(sysNum))
