function debounce(fn, wait) {
  let time;
  return function (...args) {
    if (time) clearTimeout(time);

    time = setTimeout(() => {
      fn.call(this, ...args);
    }, wait);
  };
}

function test() {
  console.log(123);
}
let btnClick = debounce(test, 1000)
