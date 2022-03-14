
// 原型继承
function inheritObject(o) {
  function F() { }
  F.prototype = o
  return new F()
}

function inheritPrototype(subClass, superClass) {
  var p = inheritObject(superClass.prototype)
  p.constructor = subClass
  subClass.prototype = p
}
// 这个示例中的 inheritPrototype()函数实现了寄生组合式继承的最简单形式。
// 这个函数接收两个参数：子类型构造函数和超类型构造函数。
// 在函数内部，第一步是创建超类型原型的一个副本。第二步是为创建的副本添加 constructor 属性，从而弥补因重写原型而失去的默认的 constructor 属性。
// 最后一步，将新创建的对象（即副本）赋值给子类型的原型。

function SuperClass(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperClass.prototype.getName = function () {
  console.log(this.name)
}

function SubClass(name, time) {
  SuperClass.call(this, name)
  this.time = time
}

inheritPrototype(SubClass, SuperClass)

SubClass.prototype.getTime = function () {
  console.log(this.time)
}



var instance1 = new SubClass('js book', 2014)
var instance2 = new SubClass('css book', 2013)
instance1.colors.push('black')

console.log(instance1.colors) // ["red", "blue", "green", "black"]
console.log(instance2.colors) // ["red", "blue", "green"]

instance1.getName() // js book
instance1.getTime() // 2014

instance2.getName() // css book
instance2.getTime() // 2013

// 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。
// 其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。
// 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型

