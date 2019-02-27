class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
  def isBanlance(self, root: TreeNode) -> bool:
      is_b = False
      height_l = self.getTreeHeight(root.left)
      height_r = self.getTreeHeight(root.right)

      if self.isBanlance(root.left) and self.isBanlance(root.right) and abs(height_l - height_r) <= 1:
          is_b = True
      return  is_b

  def getTreeHeight(self, root: TreeNode) -> int:
      if root is None:
          return  0
      height_l = self.getTreeHeight(root.left)
      height_r = self.getTreeHeight(root.right)
      return max(height_l, height_r) + 1
