/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

var sortedArrayToBST = function(nums) {
    var length = nums.length
    var root_index = parseInt(length / 2)

    if(length === 0) {
        return null
    }

    var root = new TreeNode(nums[root_index])

    
    if(length === 1) {
        return root
    }

    if(length === 2) {
        root.left = sortedArrayToBST([nums[0]])
        return root
    }

    root.left = sortedArrayToBST(nums.slice(0, root_index))
    root.right = sortedArrayToBST(nums.slice(root_index + 1, length))

    return root
}

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

console.log(sortedArrayToBST([-10,-3,0,5,9]))
