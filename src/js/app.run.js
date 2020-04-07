const App = function () {
    this._task = []
    this._executeIndex = 0
    return this
}

App.prototype.use = function (fn) {
    if (this._task && typeof fn === 'function') {
        this._task.push(CreatePromise(fn))
    }
}

App.prototype.run = function () {

    let executeBind = execute.bind(this);

    executeBind()

    function execute() {
        if (!this._task[this._executeIndex]) {
            return
        }
        this._task[this._executeIndex]().then(executeBind, err => {
            throw new Error('promise error')
        });
        this._executeIndex += 1
    }
}

App.prototype.runAsync = async function () {
    while (this._task && this._task.length > 0) {
        await this._task.shift()
    }
}


function CreatePromise(fn) {
    return () => {
        return new Promise((resolve, reject) => {
            fn(resolve, this)
        })
    }
}

let app = new App()

app.use((next) => {
    console.log(123)
    next()
})
app.use((next) => {
    console.log(321)
    setTimeout(() => {
        console.log(2342)
        next()
    }, 2000)
})

app.run()