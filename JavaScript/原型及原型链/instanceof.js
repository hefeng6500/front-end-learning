function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

Car.prototype.drive = function () {
  console.log('drive');
}
const auto = new Car('Honda', 'Accord', 1998);

/**
    instanceof : 用于描述构造函数的 prototype 是否出现在实例的原型链上
    语法： object instanceof constructor
*/

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true

console.log(auto instanceof Car); // true, Car.prototype 出现在 auto 的原型链(auto.__proto__)上
console.log(Car instanceof Object); // true, Object.prototype 出现在 Car 的原型链(Car.__proto__)上
console.log(auto instanceof Object); // true, Object.prototype 出现在 auto 的原型链(auto.__proto__)上


// 测试原型链（__proto__）的指向
console.log(auto.__proto__ === Car.prototype); // true,
console.log(Car.__proto__ === Function.prototype); // true,
console.log(Function.__proto__ === Function.prototype); // true,
console.log(Function.prototype.__proto__ === Object.prototype);  // true, 构造函数原型对象的一个对象，对象的原型链指向对象的原型
console.log(Car.prototype.__proto__ === Object.prototype); // true


console.log(Object.__proto__ === Function.prototype); // true, 说明 Object 也是一个构造函数，函数的原型指向函数的原型对象
console.log(Object.prototype.__proto__ === null); // true, 这就到顶了
