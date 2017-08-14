import sys
import re
def getNum(s):
    m = list(set(list(s)))
    if len(m) == 0:
        return 0
    if len(m) == 1:
        return 1
    if len(m) == 2:
        return 2
    if len(m) > 2:
        return 2

for line in sys.stdin:
    a = line.split()
    if len(a) > 0:
        s = a[0]
        reg = re.compile('[A-Z]{1,50}')
        if reg.match(s):
            print(getNum(s))