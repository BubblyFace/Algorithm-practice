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
    if(this.hashTable[key].isStale){
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
    this.length ++;
    return
  }

  if (!this.hashTable[key]) {
    let cacheObj = new Cache(this, value);
    this.head.pre = cacheObj;
    cacheObj.next = this.head;
    this.head = cacheObj;
    this.hashTable[key] = cacheObj;
    this.length ++;

  } else {
    this.updata(key);
    this.hashTable[key].value = value;
  }  

  if (this.length > this.maxLength) {
    this.tail.isStale = true;
    this.tail = this.tail.pre;
    this.length --;
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
  } else if(hitCache.isStale) {
    hitCache.isStale = false;
    this.length ++;
  }  
  else if (!hitCache.next) {
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

LRUCache.prototype.checkHashTable = function() {
  let hashTable = this.hashTable;
  // let keys = Object.keys(hashTable);
  let maxNum = 0

  for(let key in hashTable) {
    if(!hashTable[key].isStale) {
      maxNum ++
    }
    if(maxNum > this.maxLength) {
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

options = {
  doList: ["LRUCache","put","get","put","get","get","get","put","get","put","put","put","put","put","put","get","put","put","get","put","put","put","put","put","put","put","get","put","put","put","put","put","put","get","put","put","get","put","get","put","get","put","put","get","put","put","put","get","get","put","put","get","put","get","get","get","get","put","get","put","put","put","get","put","put","get","get","get","put","put","put","put","get","get","get","get","put","get","put","get","put","put","get","get","get","get","get","get","put","put","get","get","put","get","put","put","get","get","put","put","put","put","put","get","put","get","get","put","get","put","put","put","put","get","put","put","put","put","get","get","get","get","put","put","get","get","put","put","put","put","put","put","put","get","put","put","get","get","put","put","put","put","put","put","put","put","put","put","put","get","put","get","get","get","put","put","put","put","put","get","put","put","get","put","put","get","put","get","put","get","put","get","get","get","get","put","get","get","get","put","put","put","get","get","get","put","put","put","put","get","get","get","put","get","get","get","get","put","get","put","put","get","get","put","put","get","get","put","put","put","get","put","get","get","put","put","put","get","put","get","put","get","put","get","put","get","put","put","get","put","put","get","put","get","get","put","get","get","get","put","get","put","put","put","put","get","get","put","get","put","get","put","get","put","get","get","get","get","get","put","put","get","put","get","put","put","get","get","put","get","get","put","get","put","put","get","put","put","get","get","put","put","get","get","put","get","put","put","get","put","put","put","get","put","put","get","get","get","get","put","put","get","get","put","put","get","put","put","put","put","get","put","get","put","get","get","put","get","put","put","get","get","put","get","put","put","get","put","get","put","put","put","put","get","get","get","put","put","put","put","get","get","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","put","get","put","get","get","put","get","put","put","get","get","put","put","put","put","put","put","get","put","get","get","get","get","put","get","put","put","get","put","get","put","put","get","put","put","put","put","put","put","put","put","put","put","put","get","put","get","put","get","put","put","put","get","put","get","get","put","get","get","put","get","put","put","get","get","get","get","get","put","put","put","get","put","get","put","get","get","get","put","get","put","put","put","get","get","get","get","put","put","put","put","put","put","get","get","put","put","get","put","put","get","put","get","get","get","get","put","get","get","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","put","put","put","get","put","put","put","put","put","put","put","get","put","put","put","put","put","put","get","get","put","get","get","get","get","get","put","put","put","put","put","put","put","get","put","put","get","put","get","put","put","get","put","put","get","put","put","get","get","get","get","put","put","put","get","get","put","get","put","put","put","put","get","put","put","get","get","put","put","put","put","put","put","put","put","put","get","get","put","put","get","put","put","put","put","get","put","get","get","put","get","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","get","get","put","put","get","put","put","put","put","get","get","get","put","put","get","put","get","put","put","put","put","get","put","put","put","put","get","get","put","put","get","get","put","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","get","get","put","put","put","put","put","get","get","put","put","put","get","put","put","put","put","get","put","put","get","get","put","put","get","get","put","put","get","put","put","put","put","get","get","get","get","put","get","get","put","put","put","get","get","put","put","get","get","get","put","get","get","get","put","get","get","get","put","put","put","put","get","put","put","put","get","get","put","get","put","put","get","get","put","get","get","get","get","put","put","put","put","put","put","put","put","get","get","put","put","put","get","put","get","get","get","put","put","get","put","put","put","put","put","put","get","put","put","put","put","get","put","put","get","put","get","put","get","put","get","put","get","put","put","put","get","put","get","get","get","get","get","put","put","put","get","put","put","put","get","get","put","put","put","put","get","put","put","put","put","put","put","get","get","put","put","put","put","put","put","get","put","put","put","get","get","put","put","put","put","put","put","put","put","put","get","put","put","get","get","get","get","put","put","get","put","get","get","get","put","put","put","put","put","put","put","get","get","put","put","put","put","put","get","get","put","put","get","put","get","put","put","put","get","put","get","put","get","get","put","get","get","get","put","put","put","put","get","put","get","put","put","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","get","put","put","get","get","put","put","put","put","get","put","get","put","put","put","put","put","put","put","put","put","get","put","put","put","put","get","get","get","put","get","get","put","put","put","put","get","put","get","get","get","put","get","get","put","get","put","get","put","put","get","put","get","get","get","get","put","put","get","put","get","get","get","get","put","put","put","get","put","get","put","get","put","get","get","put","get","get","put","put","put","put","get","get","put","put","put","get","put","get","put","put","get","put","get","put","get","put","get","get","put","get","get","put","put","put","get","put","put","get","get","put","get","put","get","put","put","get","get"],
args: [[105],[33,219],[39],[96,56],[129],[115],[112],[3,280],[40],[85,193],[10,10],[100,136],[12,66],[81,261],[33,58],[3],[121,308],[129,263],[105],[104,38],[65,85],[3,141],[29,30],[80,191],[52,191],[8,300],[136],[48,261],[3,193],[133,193],[60,183],[128,148],[52,176],[48],[48,119],[10,241],[124],[130,127],[61],[124,27],[94],[29,304],[102,314],[110],[23,49],[134,12],[55,90],[14],[104],[77,165],[60,160],[117],[58,30],[54],[136],[128],[131],[48,114],[136],[46,51],[129,291],[96,207],[131],[89,153],[120,154],[111],[47],[5],[114,157],[57,82],[113,106],[74,208],[56],[59],[100],[132],[127,202],[75],[102,147],[37],[53,79],[119,220],[47],[101],[89],[20],[93],[7],[48,109],[71,146],[43],[122],[3,160],[17],[80,22],[80,272],[75],[117],[76,204],[74,141],[107,93],[34,280],[31,94],[132],[71,258],[61],[60],[69,272],[46],[42,264],[87,126],[107,236],[131,218],[79],[41,71],[94,111],[19,124],[52,70],[131],[103],[81],[126],[61,279],[37,100],[95],[54],[59,136],[101,219],[15,248],[37,91],[11,174],[99,65],[105,249],[85],[108,287],[96,4],[70],[24],[52,206],[59,306],[18,296],[79,95],[50,131],[3,161],[2,229],[39,183],[90,225],[75,23],[136,280],[119],[81,272],[106],[106],[70],[73,60],[19,250],[82,291],[117,53],[16,176],[40],[7,70],[135,212],[59],[81,201],[75,305],[101],[8,250],[38],[28,220],[21],[105,266],[105],[85],[55],[6],[78,83],[126],[102],[66],[61,42],[127,35],[117,105],[128],[102],[50],[24,133],[40,178],[78,157],[71,22],[25],[82],[129],[126,12],[45],[40],[86],[100],[30,110],[49],[47,185],[123,101],[102],[5],[40,267],[48,155],[108],[45],[14,182],[20,117],[43,124],[38],[77,158],[111],[39],[69,126],[113,199],[21,216],[11],[117,207],[30],[97,84],[109],[99,218],[109],[113,1],[62],[49,89],[53,311],[126],[32,153],[14,296],[22],[14,225],[49],[75],[61,241],[7],[6],[31],[75,15],[115],[84,181],[125,111],[105,94],[48,294],[106],[61],[53,190],[16],[12,252],[28],[111,122],[122],[10,21],[59],[72],[39],[6],[126],[131,177],[105,253],[26],[43,311],[79],[91,32],[7,141],[38],[13],[79,135],[43],[94],[80,182],[53],[120,309],[3,109],[97],[9,128],[114,121],[56],[56],[124,86],[34,145],[131],[78],[86,21],[98],[115,164],[47,225],[95],[89,55],[26,134],[8,15],[11],[84,276],[81,67],[46],[39],[92],[96],[89,51],[136,240],[45],[27],[24,209],[82,145],[10],[104,225],[120,203],[121,108],[11,47],[89],[80,66],[16],[95,101],[49],[1],[77,184],[27],[74,313],[14,118],[16],[74],[88,251],[124],[58,101],[42,81],[2],[133,101],[16],[1,254],[25,167],[53,56],[73,198],[48],[30],[95],[90,102],[92,56],[2,130],[52,11],[9],[23],[53,275],[23,258],[57],[136,183],[75,265],[85],[68,274],[15,255],[85],[33,314],[101,223],[39,248],[18,261],[37,160],[112],[65],[31,240],[40,295],[99,231],[123],[34,43],[87],[80],[47,279],[89,299],[72],[26,277],[92,13],[46,92],[67,163],[85,184],[38],[35,65],[70],[81],[40,65],[80],[80,23],[76,258],[69],[133],[123,196],[119,212],[13,150],[22,52],[20,105],[61,233],[97],[128,307],[85],[80],[73],[30],[46,44],[95],[121,211],[48,307],[2],[27,166],[50],[75,41],[101,105],[2],[110,121],[32,88],[75,84],[30,165],[41,142],[128,102],[105,90],[86,68],[13,292],[83,63],[5,239],[5],[68,204],[127],[42,137],[93],[90,258],[40,275],[7,96],[108],[104,91],[63],[31],[31,89],[74],[81],[126,148],[107],[13,28],[21,139],[114],[5],[89],[133],[20],[96,135],[86,100],[83,75],[14],[26,195],[37],[1,287],[79],[15],[6],[68,11],[52],[124,80],[123,277],[99,281],[133],[90],[45],[127],[9,68],[123,6],[124,251],[130,191],[23,174],[69,295],[32],[37],[1,64],[48,116],[68],[117,173],[16,89],[84],[28,234],[129],[89],[55],[83],[99,264],[129],[84],[14],[26,274],[109],[110],[96,120],[128,207],[12],[99,233],[20,305],[26,24],[102,32],[82],[16,30],[5,244],[130],[109,36],[134,162],[13,165],[45,235],[112,80],[6],[34,98],[64,250],[18,237],[72,21],[42,105],[57,108],[28,229],[83],[1,34],[93,151],[132,94],[18,24],[57,68],[42,137],[35],[80],[10,288],[21],[115],[131],[30],[43],[97,262],[55,146],[81,112],[2,212],[5,312],[82,107],[14,151],[77],[60,42],[90,309],[90],[131,220],[86],[106,85],[85,254],[14],[66,262],[88,243],[3],[50,301],[118,91],[25],[105],[100],[89],[111,152],[65,24],[41,264],[117],[117],[80,45],[38],[11,151],[126,203],[128,59],[6,129],[91],[118,2],[50,164],[74],[80],[48,308],[109,82],[3,48],[123,10],[59,249],[128,64],[41,287],[52,278],[98,151],[12],[25],[18,254],[24,40],[119],[66,44],[61,19],[80,132],[62,111],[80],[57,188],[132],[42],[18,314],[48],[86,138],[8],[27,88],[96,178],[17,104],[112,86],[25],[129,119],[93,44],[115],[33,36],[85,190],[10],[52,182],[76,182],[109],[118],[82,301],[26,158],[71],[108,309],[58,132],[13,299],[117,183],[115],[89],[42],[11,285],[30,144],[69],[31,53],[21],[96,162],[4,227],[77,120],[128,136],[92],[119,208],[87,61],[9,40],[48,273],[95],[35],[62,267],[88,161],[59],[85],[131,53],[114,98],[90,257],[108,46],[54],[128,223],[114,168],[89,203],[100],[116],[14],[61,104],[44,161],[60,132],[21,310],[89],[109,237],[105],[32],[78,101],[14,71],[100,47],[102,33],[44,29],[85],[37],[68,175],[116,182],[42,47],[9],[64,37],[23,32],[11,124],[130,189],[65],[33,219],[79,253],[80],[16],[38,18],[35,67],[107],[88],[37,13],[71,188],[35],[58,268],[18,260],[73,23],[28,102],[129],[88],[65],[80],[119,146],[113],[62],[123,138],[18,1],[26,208],[107],[107],[76,132],[121,191],[4],[8],[117],[11,118],[43],[69],[136],[66,298],[25],[71],[100],[26,141],[53,256],[111,205],[126,106],[43],[14,39],[44,41],[23,230],[131],[53],[104,268],[30],[108,48],[72,45],[58],[46],[128,301],[71],[99],[113],[121],[130,122],[102,5],[111,51],[85,229],[86,157],[82,283],[88,52],[136,105],[40],[63],[114,244],[29,82],[83,278],[131],[56,33],[123],[11],[119],[119,1],[48,52],[47],[127,136],[78,38],[117,64],[130,134],[93,69],[70,98],[68],[4,3],[92,173],[114,65],[7,309],[31],[107,271],[110,69],[45],[35,288],[20],[38,79],[46],[6,123],[19],[84,95],[76],[71,31],[72,171],[35,123],[32],[73,85],[94],[128],[28],[38],[109],[85,197],[10,41],[71,50],[128],[3,55],[15,9],[127,215],[17],[37],[111,272],[79,169],[86,206],[40,264],[134],[16,207],[27,127],[29,48],[32,122],[15,35],[117,36],[127],[36],[72,70],[49,201],[89,215],[134,290],[77,64],[26,101],[99],[36,96],[84,129],[125,264],[43],[38],[24,76],[45,2],[32,24],[84,235],[16,240],[17,289],[49,94],[90,54],[88,199],[23],[87,19],[11,19],[24],[57],[4],[40],[133,286],[127,231],[51],[52,196],[27],[10],[93],[115,143],[62,64],[59,200],[75,85],[7,93],[117,270],[116,6],[32],[135],[2,140],[23,1],[11,69],[89,30],[27,14],[100],[61],[99,41],[88,12],[41],[52,203],[65],[62,78],[104,276],[105,307],[7],[23,123],[22],[35,299],[69],[11],[14,112],[115],[112],[108],[110,165],[83,165],[36,260],[54,73],[36],[93,69],[134],[125,96],[74,127],[110,305],[92,309],[87,45],[31,266],[10],[114,206],[49,141],[82],[92,3],[91,160],[41],[60,147],[36,239],[23,296],[134,120],[6],[5,283],[117,68],[35],[120],[44,191],[121,14],[118,113],[84,106],[23],[15,240],[37],[52,256],[119,116],[101,7],[14,157],[29,225],[4,247],[8,112],[8,189],[96,220],[104],[72,106],[23,170],[67,209],[70,39],[18],[6],[34],[121,157],[16],[19],[83,283],[13,22],[33,143],[88,133],[88],[5,49],[38],[110],[67],[23,227],[68],[3],[27,265],[31],[13,103],[116],[111,282],[43,71],[134],[70,141],[14],[119],[43],[122],[38,187],[8,9],[63],[42,140],[83],[92],[106],[28],[57,139],[36,257],[30,204],[72],[105,243],[16],[74,25],[22],[118,144],[133],[71],[99,21],[26],[35],[89,209],[106,158],[76,63],[112,216],[128],[54],[16,165],[76,206],[69,253],[23],[54,111],[80],[111,72],[95,217],[118],[4,146],[47],[108,290],[43],[70,8],[117],[121],[42,220],[48],[32],[68,213],[30,157],[62,68],[58],[125,283],[132,45],[85],[92],[23,257],[74],[18,256],[90],[10,158],[57,34],[27],[107]],
expected: [null,null,-1,null,-1,-1,-1,null,-1,null,null,null,null,null,null,280,null,null,-1,null,null,null,null,null,null,null,-1,null,null,null,null,null,null,261,null,null,-1,null,-1,null,-1,null,null,-1,null,null,null,-1,38,null,null,-1,null,-1,-1,148,-1,null,-1,null,null,null,-1,null,null,-1,-1,-1,null,null,null,null,-1,-1,136,-1,null,-1,null,-1,null,null,-1,-1,153,-1,-1,-1,null,null,-1,-1,null,-1,null,null,-1,-1,null,null,null,null,null,-1,null,-1,160,null,51,null,null,null,null,-1,null,null,null,null,218,-1,261,-1,null,null,-1,-1,null,null,null,null,null,null,null,193,null,null,-1,-1,null,null,null,null,null,null,null,null,null,null,null,220,null,-1,-1,-1,null,null,null,null,null,-1,null,null,306,null,null,219,null,-1,null,-1,null,266,193,90,-1,null,-1,147,-1,null,null,null,148,147,131,null,null,null,null,-1,291,291,null,-1,178,-1,136,null,-1,null,null,147,-1,null,null,287,-1,null,null,null,-1,null,-1,183,null,null,null,174,null,110,null,-1,null,-1,null,-1,null,null,12,null,null,-1,null,89,305,null,70,-1,94,null,-1,null,null,null,null,-1,241,null,176,null,220,null,-1,null,306,-1,183,-1,12,null,null,-1,null,95,null,null,-1,-1,null,311,111,null,190,null,null,84,null,null,-1,-1,null,null,177,157,null,-1,null,null,-1,null,null,null,174,null,null,51,183,-1,4,null,null,-1,-1,null,null,21,null,null,null,null,51,null,176,null,89,-1,null,-1,null,null,176,313,null,86,null,null,229,null,176,null,null,null,null,294,110,101,null,null,null,null,128,49,null,null,82,null,null,193,null,null,193,null,null,null,null,null,-1,85,null,null,null,101,null,126,66,null,null,-1,null,null,null,null,null,-1,null,-1,67,null,66,null,null,126,101,null,null,null,null,null,null,84,null,184,23,198,110,null,101,null,null,130,null,131,null,null,130,null,null,null,null,null,null,null,null,null,null,null,239,null,35,null,-1,null,null,null,287,null,-1,240,null,313,67,null,-1,null,null,121,239,299,101,105,null,null,null,118,null,160,null,135,255,-1,null,11,null,null,null,101,258,-1,35,null,null,null,null,null,null,88,160,null,null,11,null,null,276,null,291,299,90,75,null,291,276,118,null,-1,121,null,null,252,null,null,null,null,145,null,null,191,null,null,null,null,null,-1,null,null,null,null,null,null,null,75,null,null,null,null,null,null,65,23,null,139,164,177,165,311,null,null,null,null,null,null,null,184,null,null,309,null,100,null,null,151,null,null,-1,null,null,167,90,-1,299,null,null,null,173,173,null,-1,null,null,null,null,-1,null,null,313,45,null,null,null,null,null,null,null,null,null,252,167,null,null,212,null,null,null,null,132,null,94,137,null,308,null,-1,null,null,null,null,167,null,null,164,null,null,288,null,null,82,2,null,null,-1,null,null,null,null,164,299,137,null,null,295,null,139,null,null,null,null,-1,null,null,null,null,101,65,null,null,249,190,null,null,null,null,-1,null,null,null,-1,-1,151,null,null,null,null,203,null,90,88,null,null,null,null,null,190,160,null,null,null,40,null,null,null,null,24,null,null,132,30,null,null,-1,161,null,null,67,null,null,null,null,119,161,24,132,null,-1,267,null,null,null,-1,-1,null,null,227,-1,183,null,311,295,-1,null,167,188,47,null,null,null,null,311,null,null,null,53,256,null,144,null,null,268,-1,null,188,233,-1,191,null,null,null,null,null,null,null,null,-1,-1,null,null,null,53,null,138,118,146,null,null,-1,null,null,null,null,null,null,175,null,null,null,null,53,null,null,-1,null,-1,null,-1,null,-1,null,132,null,null,null,88,null,-1,301,102,79,237,null,null,null,301,null,null,null,104,13,null,null,null,null,-1,null,null,null,null,null,null,215,-1,null,null,null,null,null,null,233,null,null,null,311,79,null,null,null,null,null,null,null,null,null,230,null,null,76,188,3,264,null,null,-1,null,127,41,69,null,null,null,null,null,null,null,24,-1,null,null,null,null,null,47,104,null,null,-1,null,24,null,null,null,93,null,-1,null,295,69,null,143,86,48,null,null,null,null,260,null,290,null,null,null,null,null,null,41,null,null,283,null,null,-1,null,null,null,null,123,null,null,299,-1,null,null,null,null,296,null,13,null,null,null,null,null,null,null,null,null,276,null,null,null,null,1,123,-1,null,240,-1,null,null,null,null,133,null,79,305,209,null,175,55,null,266,null,6,null,null,120,null,157,116,71,-1,null,null,-1,null,283,3,-1,102,null,null,null,106,null,240,null,-1,null,286,50,null,101,299,null,null,null,null,301,73,null,null,null,227,null,-1,null,null,144,null,-1,null,71,null,68,157,null,52,24,null,null,null,268,null,null,197,3,null,25,null,54,null,null,265,271]
}
// let options = {
//   doList: ["LRUCache","put","put","get","get","put","get","get","get"],
//   args: [[2],[2,1],[3,2],[3],[2],[4,3],[2],[3],[4]],
//   expected: [null,null,null,2,1,null,1,-1,3]
// }

let handler = {
  "LRUCache": Object.create(LRUCache).createNew,
}

function handle(options) {
  const {
    doList,
    args,
    expected 
  } = options;
  let self = handler[doList[0]](...args[0]);
  for (let i = 1; i < doList.length; i++) {
    console.log(doList[i], i);
    if(i === 462) {
      debugger
    }
    let output = self[doList[i]](...args[i]);
    if(output === undefined) {
      output = null;
    }
    if(output !== expected[i]) {
      console.info( `${doList[i]} ${args[i]} index:: ${i} -${output}::${expected[i]}`)
    }
  }
}

handle(options)