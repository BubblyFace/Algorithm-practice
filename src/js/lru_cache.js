/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  let self = this;
  if (!(self instanceof LRUCache)) {
    self = new LRUCache()
  }

  self.maxLength = capacity || 0;
  self.length = 0;
  self.head;
  self.tail;
  self.operateTime = 0;
  self.hashTable = {};

  return self
};


LRUCache.createNew = LRUCache;

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {

  if (this.hashTable[key]) {
    if (this.hashTable[key].isStale) {
      delete(this.hashTable[key]);
      return -1
    }
    if (this.operateTime - this.hashTable[key].currentOperateTime < this.maxLength) {
      this.updata(key);
      this.hashTable[key].isStale = false;
      return this.hashTable[key].value;
    } else {
      delete(this.hashTable[key]);
      return -1
    }
  } else {
    return -1
  }

};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {

  if (!this.tail) {
    let cacheObj = new Cache(this, value);
    this.hashTable[key] = cacheObj;
    this.tail = cacheObj
    this.head = cacheObj;
    this.length++;
    return
  }

  if (!this.hashTable[key]) {
    let cacheObj = new Cache(this, value);
    this.head.pre = cacheObj;
    cacheObj.next = this.head;
    this.head = cacheObj;
    this.hashTable[key] = cacheObj;
    this.length++;

  } else {
    this.updata(key);
    this.hashTable[key].value = value;
  }

  if (this.length > this.maxLength) {
    this.tail.isStale = true;
    this.tail = this.tail.pre;
    this.length--;
    this.tail.next = null;
  }
};


LRUCache.prototype.updata = function (key) {
  let hitCache = this.hashTable[key];

  if (!hitCache) {
    throw new Error("can not hit this key in table");
  }


  // head 
  if (!hitCache.pre) {
    return
  } else if (hitCache.isStale) {
    hitCache.isStale = false;
    this.length++;
  } else if (!hitCache.next) {
    // tail
    hitCache.pre.next = null;
    this.tail = hitCache.pre;
  } else {
    // middle
    hitCache.next.pre = hitCache.pre;
    hitCache.pre.next = hitCache.next;

    let _c = hitCache.next;
    while (_c) {
      _c.currentOperateTime++;
      _c = _c.next;
    }
  }

  hitCache.next = this.head;
  hitCache.pre = null;
  this.head.pre = hitCache;
  this.head = hitCache;
  this.addOperateTimes();
  this.head.currentOperateTime = this.operateTime;
}

LRUCache.prototype.addOperateTimes = function () {
  if (this.operateTime < this.maxLength + 2) {
    this.operateTime++;
    return
  } else {
    let _c = this.tail;
    let restartNum = 1;


    while (_c) {
      _c.currentOperateTime = restartNum;
      _c = _c.pre;

      restartNum = restartNum + 1;
    }

    this.operateTime = this.head.currentOperateTime;
  }
}


var Cache = function (LRUCache, value) {
  let self = this;

  if (!(self instanceof Cache)) {
    self = new Cache()
  }

  self.isStale = false
  self.value = value;
  self.pre = null;
  self.next = null;
  LRUCache.addOperateTimes();
  self.currentOperateTime = LRUCache.operateTime;
}

LRUCache.prototype.checkHashTable = function () {
  let hashTable = this.hashTable;
  // let keys = Object.keys(hashTable);
  let maxNum = 0

  for (let key in hashTable) {
    if (!hashTable[key].isStale) {
      maxNum++
    }
    if (maxNum > this.maxLength) {
      debugger
    }
  }
  console.log('current' + maxNum)
}


/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = Object.create(LRUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
*/

module.exports = LRUCache