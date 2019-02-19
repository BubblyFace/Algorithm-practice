def maxAreaChoice(h):
    L1, L2 = 0,0
    maxArea = 0
    for i in range(0,len(h)):
        for j in  list(range(0, i-1))[::-1]:
            if h[j] >= h[i]:
                L1 += 1
            else:
                break
        for k in list(range(i+1,len(h))):
            if h[k] >= h[i]:
                L2 += 1
            else:
                break
        if maxArea <= (L1 + L2 + 1) * h[i]:
            maxArea = (L1 + L2 + 1) * h[i]
            L1, L2 = 0, 0
        else:
            L1, L2 = 0,0
    return maxArea

testList = [2,7,9,4,1]
print(maxAreaChoice(testList))