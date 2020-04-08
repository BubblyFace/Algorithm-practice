/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 组合可以抽象成树状结构的便利，这道题就是最短的组合层级，那么就是BFS的应用
var coinChange = function(coins, amount) {

    let rt = -1

    if(amount === 0 ) {
        return 0
    }

    let currentArr = []

    BFS(0, 1, true)

    function BFS(currenTotal, deep, isTail) {
        coins.forEach(coin => {
            if(coin + currenTotal === amount) {
                rt = deep
            } else if(coin + currenTotal < amount) {
                currentArr.push(coin + currenTotal)
            }
        })

        if(rt === -1 && currentArr.length > 0 && isTail) {
            let copyArr = Array.from(currentArr);
            currentArr = [];
            copyArr.forEach(
                (sum, index) => {
                    BFS(sum, deep + 1, index === copyArr.length - 1)
                }
            )
        }
    }


    rt = rt || -1

    return rt
};


console.log(coinChange([1,2,5], 100))