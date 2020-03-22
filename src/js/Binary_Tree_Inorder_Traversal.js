/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let rt = []

    root && travel(root)

    function travel(root) {
        root.left && travel(root.left)
        rt.push(root.val)
        root.right && travel(root.right)
    }

    return rt
};