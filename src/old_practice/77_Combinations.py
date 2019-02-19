from itertools import combinations
class Solution(object):
    def combine(self, n, k):
        return list(combinations(range(1, n+1), k))


class Solution2:
    def combine(self, n, k):
        if k == 0:
            return [[]]
        return [pre + [i] for i in range(1, n+1) for pre in self.combine(i-1, k-1)]