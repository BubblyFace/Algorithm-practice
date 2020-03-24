/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    var dict = {}
    let rt = []

    if(candidates.length === 0) {
        return rt
    }

    for(let i = 0; i < candidates.length; i ++ ) {
        let num = candidates[i]

        if(num > target) {
            continue
        }

        if(num === target) {
            rt.push([target])
        }


        let sum = num
        let tick = 1

        while(sum <= target) {
            let arr = new Array(tick).fill(num)
            dict[sum] ? dict[sum].push(arr) : (dict[sum] = [arr]) 
            sum += num
            tick += 1
        }
    }

    Object.keys(dict).forEach(key => {
        if(Number(key) === target) {
            rt.push(...dict[key])
        }

        if(dict[target - key]) {
            for(let i = 0; i < dict[key].length; i ++) {
                for(let j = 0; j < dict[target - key].length; j ++) {
                    dict[key][i] !== dict[target - key][j] && rt.push(dict[key][i].concat(dict[target - key][j]))
                }
            }

            dict[key] = dict[target - key] = null
        }
    })

    return rt
};

// unhandle case
// 
// [2,3,5]
// 8