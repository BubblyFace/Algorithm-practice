import sys
arr = []
sum_self = 0
hint = 0
index = 0
data = []
current_index = 0

for line in sys.stdin:
    data.append(line.split())


#init data
n = int(data[0][0])
r = int(data[0][1])
avg = int(data[0][2])

for i in range(1,len(data)):
    print([data[i][0]],[data[i][1]])
    arr.append([int(data[i][0]), int(data[i][1])])
    sum_self += int(data[i][0])

#sum_self 所有成绩和
#hint 魔法消耗值
while sum_self < avg * n:
    for i in range(0, len(arr)):
        if arr[i][0] < r:
            hint += (r - arr[i][0]) * arr[i][1]
            sum_self += r - arr[i][0]
            current_index = i
            continue

if sum_self > avg * n:
    hint -= arr[current_index][1] * (avg * n - sum_self)
print(hint)