function throttle(callback, wait) {
  let start = Date.now();
  return function (...args) {
    let end = Date.now();
    if (end - start >= wait) {
      callback.call(this, ...args);
      start = Date.now();
    }
  };
}

function test() {
  console.log(123);
}

let throttleTest = throttle(test, 1000);
