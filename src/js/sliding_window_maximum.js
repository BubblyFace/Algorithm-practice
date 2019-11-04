/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if(k === 1) {
      return nums
    }

    let ret = []
    for(let i = 0; i <= nums.length - k; i ++) {
      ret.push(Math.max(...nums(i, i + k)));
    }
    return ret
};