/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let leftArr = []
    let revDict = {
        ']': '[',
        ')': '(',
        '}': '{'
    }

    for(let i = 0; i < s.length; i ++) {
        let c = s[i];
        if(c == '[' || c == '(' || c == '{') {
            leftArr.push(c)
        } 

        if(revDict[c]) {
            if(leftArr.pop() !== revDict[c]) {
                return false
            }
        }
    }

    return leftArr.length === 0
};