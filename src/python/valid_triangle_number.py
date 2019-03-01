
class Solution:
    def triangleNumber(self, nums: list) -> int:
        l_n = len(nums)
        n_match = 0
        self.s_nums = sorted(nums)

        if l_n < 3:
            return  n_match
        elif l_n == 3:
            n_match = 1 if self.judgeTriangle(0, 1, 2) else  0
            return  n_match
        else:
            index = 0
            seed1 = 1
            seed2 = 2
            while index < l_n - 3:
                if self.judgeTriangle(index, seed1, seed2):
                    n_match = n_match + 1
                if seed2 < l_n :
                    seed2 = seed2 + 1
                    continue
                elif seed1 < l_n - 1:
                    seed1 = seed1 + 1
                    seed2 = seed1 + 1
                    continue
                else:
                    index = index + 1
                    seed1 = index + 1
                    seed2 = seed1 + 1
        return n_match


    def judgeTriangle(self, index, seed1, seed2):
        return True if self.s_nums[index] + self.s_nums[seed1] > self.s_nums[seed2] else False