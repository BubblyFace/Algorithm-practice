# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
import random
class Solution(object):
    def random_ban_zhou(self, fool_value):
        """
        :type root: TreeNode
        :rtype: int
        """
        max_ban = 43199
        return int(max_ban * random.random())

    def get_ban_time(self, fool_value):
        ban_total = self.random_ban_zhou(self,fool_value)
        ban_day = ban_total // 1440
        ban_hour = (ban_total - ban_day * 1440) // 60
        ban_min = (ban_total - ban_day * 1440 - ban_hour * 60)
        print("请禁言周明：" + str(ban_day) + "天" + str(ban_hour) + "小时" +str(ban_min) + "分钟")
        return [ban_total, ban_day, ban_hour]


test = Solution.get_ban_time(Solution,"test")