// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.
 

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this._stack = [];
    this._minIndex;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if(!this._minIndex && this._minIndex !== 0) {
      this._minIndex = 0;
    } else if(this._stack[this._minIndex] > x) {
      this._minIndex = this._stack.length;
    }
    this._stack.push(x);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if(this._stack && this._stack.length !== 0) {
    // 处理pop的元素为最小值时
    if(this._minIndex === this._stack.length - 1) {
      let currentMin;
      for(let i = 0; i < this._stack.length - 1;  i ++) {
        if (!currentMin && currentMin !== 0) { 
          currentMin = this._stack[i]
          this._minIndex = i;
        } else if(currentMin > this._stack[i]){
          this._minIndex = i;
          currentMin = this._stack[i]
        }
      }
    }
    this._stack.pop()
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if(this._stack && this._stack.length !== 0) {
      return this._stack[this._stack.length - 1];
    }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  if(this._stack && this._stack.length > 0) {
    return(this._stack[this._minIndex]);
  }
};

module.exports = MinStack;

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */