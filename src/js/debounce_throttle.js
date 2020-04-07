function debounce(fn, debounceTime) {   
    let st
    let lastExecuteTime = 0

    return function() {
        let currentExecuteTime = Date.now()

        if((currentExecuteTime - lastExecuteTime) < debounceTime) {
            clearTimeout(st);
            st = setTimeout(() => {
                fn()
                clearTimeout(st);
            }, debounceTime)
            lastExecuteTime = currentExecuteTime
        } else {
            st = setTimeout(() => {
                fn()
                clearTimeout(st);
            }, debounceTime)
        } 
    }
}

function throttle(fn, throttleTime) {
    let lastExcute = Date.now()

    return function() {
        let now = Date.now();
        let context = this;

        if(now - lastExcute >= throttleTime) {
            fn.apply(context, arguments)
            lastExcute = Date.now()
        }
    }
}

function throttleWithDebounde(fn, debounceTime, throttleTime) {
    return throttle(debounce(fn, debounceTime), throttleTime)
}