# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
  def isBalanced(self, root: TreeNode) -> bool:
      is_b = False
      if root is None:
          return  True

      height_l = self.getTreeHeight(root.left)
      height_r = self.getTreeHeight(root.right)

      if self.isBalanced(root.left) and self.isBalanced(root.right) and abs(height_l - height_r) <= 1:
          is_b = True
      return  is_b

  def getTreeHeight(self, root: TreeNode) -> int:
      if root is None:
          return  0
      height_l = self.getTreeHeight(root.left)
      height_r = self.getTreeHeight(root.right)
      return max(height_l, height_r) + 1