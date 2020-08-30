/**
 * @param {*} fn  accept a function witch accept a resolve and a rejectFn
 */

const STATUS = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
}

function Pm(fn) {
    this.status = STATUS.PENDING;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    try {
        fn(resolve, reject);
    } catch (error) {
        reject(error)
    }

    let that = this;

    function resolve(value) {
        if (that.status === STATUS.PENDING) {
            that.status = STATUS.FULFILLED;
            that.value = value;
            if (that.onFulfilledCbs && that.onFulfilledCbs.length > 0) {
                that.onFulfilledCbs.forEach(cb => {
                    cb(that.value)
                })
            }
        }
    }

    function reject(error) {
        if (that.status === STATUS.PENDING) {
            that.status = STATUS.REJECTED;
            that.error = error;
            if (that.onRejectedCbs && that.onRejectedCbs.length > 0) {
                that.onRejectedCbs.forEach(cb => {
                    cb(that.error)
                })
            }
        }
    }

}

Pm.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    let pm2;

    if (onFulfilled && typeof onFulfilled === 'function') {
        self.onFulfilledCbs.push(onFulfilled)
    } else {
        self.onFulfilledCbs.push((value) => {
            console.log('empty handler')
        })
    }

    if (onRejected && typeof onRejected === 'function') {
        self.onRejectedCbs.push(onRejected)
    } else {
        self.onRejectedCbs.push((err) => {
            console.error(`empty`)
        })
    }

    // 按照then调用的时机来进行promise的返回处理
    switch (self.status) {
        case STATUS.PENDING:
            // pendding 相当于组合两种方式
            pm2 = new Pm((resolve, reject) => {
                self.onFulfilledCbs.push((value) => {
                    try {
                        let rt = onFulfilled(self.value)
                        if (rt instanceof Pm) {
                            rt.then(resolve, reject)
                        } else {
                            resolve(rt)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })

                self.onRejectedCbs.push((error) => {
                    try {
                        let rt = onRejected(self.error);
                        if (rt instanceof Pm) {
                            rt.then(resolve, reject)
                        } else {
                            resolve(rt)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            })

            break;
        case STATUS.FULFILLED:
            pm2 = new Pm((resolve, reject) => {
                try {
                    let rt = onFulfilled(self.value)
                    if (rt instanceof Pm) {
                        rt.then(resolve, reject)
                    } else {
                        resolve(rt)
                    }
                } catch (e) {
                    reject(e)
                }
            })
            break
        case STATUS.REJECTED:
            pm2 = new Pm((resolve, reject) => {
                try {
                    let rt = onRejected(self.error);
                    if (rt instanceof Pm) {
                        rt.then(resolve, reject)
                    } else {
                        resolve(rt)
                    }
                } catch (e) {
                    reject(e)
                }
            })
            break

        default:
            break;
    }

    return pm2
}

Pm.prototype.all = function (pms) {
    let counts = pms.length
    let results = []
    let status = STATUS.PENDING

    return new Pm((resolve, reject) => {
        for(let i = 0; i < pms.length; i ++) {
            pms.then((value) => {
                results.push(value)

                counts --

                if(counts === 0) {
                    status === STATUS.PENDING && resolve(results);
                    status = STATUS.FULFILLED;
                }
            }, (error) => {
                reject(error)
            })
        }
    })
}

Pm.prototype.race = function (pms) {
    let counts = pms.length
    let results = []
    let status = STATUS.PENDING

    return new Pm((resolve, reject) => {
        for(let i = 0; i < pms.length; i ++) {
            pms.then((value) => {
                status === STATUS.PENDING && resolve(results);
                status = STATUS.FULFILLED;
            }, (error) => {
                status === STATUS.PENDING && reject(error)
                status = STATUS.REJECTED;
            })
        }
    })
}

// api 错误
Pm.prototype.allSettled = function (pms) {
    let counts = pms.length
    let results = []

    return new Pm((resolve, reject) => {
        for(let i = 0; i < pms.length; i ++) {
            pms.then((value) => {
                results.push(value)

                counts --

                if(counts === 0) {
                    resolve(results);
                }
            }, (error) => {
                results.push(error)

                counts --

                if(counts === 0) {
                    resolve(error);
                }
            })
        }
    })
}