function throttle(func, wait, immediate = true) {
  var context, args;
  var previous = 0;

  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}

function test() {
  console.log(123);
}

let throttleTest = throttle(test, 1000);
