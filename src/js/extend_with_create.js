// common
function Father(props) {
    this.name = props && props.name || 'father'
}

Father.prototype.sayName = function sayName() {
    console.log(this.name)
}

function Son() {
    Father.call(this, ...arguments)
}

Son.prototype = Object.create(Father.prototype)
Son.prototype.constructor = Son

Son.prototype.isSon = function() {
    return true
}

let son = new Son({
    name: 'helo'
})
console.log(son instanceof Father)
console.log(son.name)
console.log(son.isSon())

// combine
function Student(props) {
    this.grade = props && props.grade || 0
}

function combine(originClass, ...classes) {
   function ComineClass() {
        originClass.call(this, ...arguments)
        classes.forEach(Clz => {
            // copy构造器创建的示例属性
            Clz.call(this, ...arguments)
        });
    }

    let oriProto = Object.create(originClass.prototype)

    classes.forEach(Clz => {
        Object.assign(oriProto, Object.create(Clz.prototype));
    })

    return ComineClass
}

let CbClass = combine(Son, Student);

let student1 = new CbClass({
    name: 'haha',
    grade: 3
})

console.log(student1.name, student1.grade)