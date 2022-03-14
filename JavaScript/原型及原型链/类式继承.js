/**
 * 
 * 类式继承
 */

function SuperClass() {
  this.superValue = true;
}
SuperClass.prototype.getSuperValue = function () {
  console.log(this.superValue)
}

function SubClass() {
  this.subValue = false
}

SubClass.prototype = new SuperClass()
SubClass.prototype.getSubValue = function () {
  console.log(this.subValue)
}

var instance = new SubClass()
instance.getSuperValue() // true
instance.getSubValue() // false

console.log(instance instanceof SuperClass) // true
console.log(instance instanceof SubClass) // true

// 注意： 此处 SubClass.prototype = new SuperClass(), 
// 所以：SubClass.prototype 是构造函数 SuperClass 的实例, SubClass.prototype.__proto__ === SuperClass.prototype
// 所以：说明构造函数 SuperClass 的原型（SuperClass.prototype） 在 SubClass.prototype 的原型链(SubClass.prototype.__proto__)上

console.log(SubClass instanceof SuperClass) // false
console.log(SubClass.prototype.__proto__ === SuperClass.prototype); // true
console.log(SubClass.prototype instanceof SuperClass) // true



/**
 * 特别注意： 当父类中存在引用类型的属性时，创建的实例更改子类原型从父类构造函数继承来的共有属性时，
 * 其他子类实例时共有属性也会受到影响
 * 这是类式继承的一个缺点
 */
function SuperTest() {
  this.books = ['Javascript', 'html', 'css']
}

function SubTest() { }
SubTest.prototype = new SuperTest()

var instance1 = new SubTest()
var instance2 = new SubTest()
console.log(instance1.books)  // ["Javascript", "html", "css"]
instance1.books.push('设计模式')
console.log(instance2.books) //  ["Javascript", "html", "css", "设计模式"]

