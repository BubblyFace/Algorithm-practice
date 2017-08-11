class Solution(object):
    def findLongestChain(pairs):
        """
        :type pairs: List[List[int]]
        :rtype: int
        """
        lenth = len(pairs)
        if not any(pairs) or len(pairs) > 1000:
            return
        MaxLen = 1
        sorted_pairs = sorted(pairs, self.compare)
        i = 1
        position = 0
        while i < lenth:
            if sorted_pairs[position][1] < sorted_pairs[i][0]:
                MaxLen += 1
                position = i
                i += 1
            else: 
                i += 1
        return MaxLen

    def compare(p):
        return p1

test = [[3,4],[2,3],[1,2]]
print(sorted(test, key = Solution.compare))