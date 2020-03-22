/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let dict = {}

    if(nums.length <= 2) {
        return [0, 1]
    }

    for(let i = 0; i < nums.length; i ++) {
        let num = nums[i]
        if(dict[num] == undefined) {
            dict[target - num] = i
        } else {
            return [dict[num], i]
        }
    }
};