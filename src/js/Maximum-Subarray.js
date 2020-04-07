/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let max = nums[0];
    let testArr = [];
    for(let i = 0; i < nums.length; i ++) {
        let currentMax = getMinStart(nums.slice(i, nums.length))
        max = max < currentMax ? currentMax : max
        testArr.push(max)
    }
    
    
    return max
    
    function getMinStart(arr) {
        let startMax = currentSum =arr[0]
        for (let i = 1; i < arr.length; i ++) {
            currentSum += arr[i]
            startMax = currentSum > startMax ? currentSum : startMax
        }
        
        return startMax
    }
};

maxSubArray([-2,1,-3,4,-1,2,1,-5,4])