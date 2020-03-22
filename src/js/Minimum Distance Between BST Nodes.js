/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {
    let rt = []
    let min;

    root && travel(root)

    function travel(root) {
        root.left && travel(root.left)
        rt.push(root.val)
        root.right && travel(root.right)
    }
    
    min = abs(rt[0], rt[1])
    
    for(let i = 1; i < rt.length; i ++) {
        let _abs = abs(rt[i - 1], rt[i])
        min = _abs < min ? _abs : min
    }
        
    function abs(num1, num2) {
        return num1 >= num2 ? num1 - num2 : num2 - num1
    }
    
    return min
};