/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
    if(A.length === 0 || A.length === 1) {
        return A
    }

    var rt = []
    var cache = []

    for(let i = 0; i < A.length; i ++) {
        if(((rt.length % 2) === 0 && (A[i] % 2) === 0) 
            || ((rt.length % 2) === 1 && (A[i] % 2) === 1)) {
            rt.push(A[i])
        } else {
            A[i] % 2 === 0 ? cache.push(A[i]) : cache.unshift(A[i])
        }
    }

    // 因为是必然有结果的所以只要清掉缓存就行
    while(cache.length !== 0) {
        rt.length % 2 === 0 ? rt.push(cache.pop()) : rt.push(cache.shift())
    }

    return rt
};

console.log(sortArrayByParityII([4,2,5,7]))