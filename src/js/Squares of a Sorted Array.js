/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function (A) {
    let len = A.length

    if (len === 0) {
        return []
    }

    if (len === 1) {
        return [A[0] * A[0]]
    }

    // 处理全正
    if(A[0] >= 0) {
        return A.map( num => num * num)
    }

    let rt = []

    A.forEach(num => {
        if(num < 0) {
            rt.unshift(num * num)
        } else {
            debugger
            rt = straightInsertionSort(rt, num * num)
        }
    })


    function straightInsertionSort(array, input) {
        if(array[0] >= input) {
            array.unshift(input)
            return array
        }

        for(let i = 1; i < array.length; i ++ ){
            if(input >= array[i - 1] && input < array[i]) {
                array.splice(i, 0, input)
                return array
            }
        }

        return array.concat(input)
    }

    return rt
};

console.log(sortedSquares([-7,-3,2,3,11]))