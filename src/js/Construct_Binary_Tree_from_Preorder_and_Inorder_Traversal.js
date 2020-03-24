/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if(preorder.length === 0) {
        return null
    }

    let rt = new TreeNode(preorder[0])
    let rt_index = inorder.findIndex(num => num === preorder[0])

    rt.left = buildTree(preorder.slice(1, rt_index + 1), inorder.slice(0, rt_index))
    rt.right = buildTree(preorder.slice(rt_index + 1, preorder.length), inorder.slice(rt_index + 1, preorder.length))

    return rt
};

function TreeNode(val) {
    this.val = val
    this.left = this.right = null
}