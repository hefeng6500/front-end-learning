function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
alert(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
alert(curriedSum(1)(2)(3)); // 6，全柯里化

function curry(fn) {
  const length = fn.length;

  return function curried(...args) {
    if (args.length >= length) {
      return fn.call(this, ...args);
    } else {
      return function (...args2) {
        curried.call(this, ...args, ...args2);
      };
    }
  };
}
