function throttle(fn, wait) {
  let timer = null;
  return function (...rest) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.call(this, ...rest);
      timer = null;
    }, wait);
  };
}
