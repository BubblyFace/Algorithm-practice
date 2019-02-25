# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:

    def __init__ (self):
      self.outputList = []

    def postorderTraversal(self, root: TreeNode) -> List[int]:
      if root is None:
          return []
      if root.left is not None:
        self.postorderTraversal(root.left)
      if root.right is not None:
        self.postorderTraversal(root.right)
      if root is not None:
        self.outputList.append(root.val)
      
      return self.outputList