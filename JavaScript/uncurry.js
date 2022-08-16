const unCurry =
  (func) =>
  (...args) =>
    func.apply(args);

const obj = {
  name: "yang",
  age: 18,
};

function F() {}

// 拼接属性值的方法
F.prototype.concatProps = function () {
  let args = Array.from(arguments);
  return args.reduce((prev, next) => `${this[prev]}&${this[next]}`);
};

let concatProps = unCurry(F.prototype.concatProps);

console.log(concatProps(obj, "name", "age"));
