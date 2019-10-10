// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  if( nums.length < 2 ) {
    return 
  }

  for(let i = 0; i < nums.length; i ++) {
    for(let j = 0; j < nums.length; j ++) {
      if(i === j) {
        continue
      }
      if(nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
};

// map 表查询 
const map={};
    
for (let i = 0; i < nums.length; i++) {
  if (map[target - nums[i]] >= 0)
    return [map[target - nums[i]], i];

  map[nums[i]] = i;
}

twoSum([2,7,11,15], 9);