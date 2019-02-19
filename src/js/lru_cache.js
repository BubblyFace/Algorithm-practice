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
    let hitCache = this.hashTable[key]
    if (this.operateTime - hitCache.currentOperateTime < this.maxLength) {
      console.log(`get ${key}: ` + JSON.stringify(hitCache.value) + ` main times ${this.operateTime}`)
      if (!hitCache.pre) {
        return this.head.value
      }

      if (!hitCache.next) {

        let _c = hitCache;
        while (_c.pre) {
          _c.pre.currentOperateTime--;
          _c = _c.pre
        }

        this.tail = hitCache.pre;
        this.tail.next = null;
        hitCache.next = this.head;
        this.head.pre = hitCache;
        this.head = hitCache;
        this.head.currentOperateTime = this.operateTime;
        return this.head.value
      }


      let _c = hitCache;
      while (_c.pre) {
        _c.pre.currentOperateTime--;
        _c = _c.pre
      }

      hitCache.next.pre = hitCache.pre;
      hitCache.pre.next = hitCache.next;

      hitCache.pre = null;

      this.head.pre = hitCache;
      this.head = hitCache;
      this.head.currentOperateTime = this.operateTime;
      return this.head.value
    } else {
      hitCache = null
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
    this.operateTime++;
    let cacheObj = new Cache(this, value);
    this.hashTable[key] = cacheObj;
    this.tail = cacheObj;
    this.head = cacheObj;
    console.log(`put ${key}: ` + JSON.stringify(this.hashTable[key].value) + ` main times ${this.operateTime}`)
    return
  }

  if (!this.hashTable[key]) {
    this.operateTime++;
    let cacheObj = new Cache(this, value);
    this.head.pre = cacheObj;
    cacheObj.next = this.head;
    this.head = cacheObj;
    this.hashTable[key] = cacheObj;
    console.log(`put ${key}: ` + JSON.stringify(this.hashTable[key].value) + ` main times ${this.operateTime}`)
  } else { 
    if(!this.get(key)) {
      this.put(key, value);
    } else {
      this.hashTable[key] = value;
    }
  }

  if (this.head.currentOperateTime - this.tail.currentOperateTime >= this.maxLength) {
    this.tail = this.tail.pre;
  }
};


var Cache = function (LRUCache, value) {
  let self = this;

  if (!(self instanceof Cache)) {
    self = new Cache()
  }

  self.value = value;
  self.pre = null;
  self.next = null;
  self.currentOperateTime = LRUCache.operateTime;
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = Object.create(LRUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// let doList = ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"];
// let args = [
//   [2],
//   [1, 1],
//   [2, 2],
//   [1],
//   [3, 3],
//   [2],
//   [4, 4],
//   [1],
//   [3],
//   [4]
// ];

// let doList = ["LRUCache", "get", "put", "get", "put", "put", "get", "get"]
// let args = [
//   [2],
//   [2],
//   [2, 6],
//   [1],
//   [1, 5],
//   [1, 2],
//   [1],
//   [2]
// ]

let options = {
  doList: ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"],
  args: [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]
}
let handler = {
  "LRUCache": Object.create(LRUCache).createNew,
}

function handle(options) {
  const { doList, args } = options;
  let self = handler[doList[0]](...args[0]);
  for (let i = 1; i < doList.length; i++) {
    self[doList[i]](...args[i])
  }
}

handle(options)