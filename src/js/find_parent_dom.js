function findParent(queryString, deep, target, referDom) {
    referDom = referDom || document    
    let queryDoms = referDom.querySelectorAll(queryString);

    let rt = queryDoms.filter(dom => {
        let times = 0
        let _parent =dom

        while(times <= deep) {
            _parent = dom.parentNode
            if(!_parent) {
                break
            } else if(times === deep && _parent === target) {
                return true
            }
        }
        return false
    });

    return rt
}