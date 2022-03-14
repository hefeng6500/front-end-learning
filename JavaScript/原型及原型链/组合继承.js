function SuperClass(name) {
  this.books = ['Javascript', 'html', 'css']
  this.name = name
}
SuperClass.prototype.getName = function () {
  console.log(this.name)
}

function SubClass(name, time) { 
  SuperClass.call(this, name)
  this.time = time
}
SubClass.prototype = new SuperClass()
SubClass.prototype.getTime = function () {
  console.log(this.time)
}

var instance1 = new SubClass('JS book', 2014)
var instance2 = new SubClass('css book', 2015)

instance1.books.push('设计模式')
console.log(instance1.books) // ["Javascript", "html", "css", "设计模式"]
instance1.getName() // JS book
instance1.getTime() // 2014
  
console.log(instance2.books) // ["Javascript", "html", "css"]
instance2.getName() // css book
instance2.getTime() // 2015

// 缺点：SubClass.prototype = new SuperClass() 子类原型被赋值为超类构造函数的实例，虽然子类继承到了超类 prototype 上的方法，但是在实例化超类时，再一次调用了超类构造函数导致在新对象上创建属性，因为子类构造函数中 SuperClass.call(this, name) 已经调用过一次，两次调用累赘！