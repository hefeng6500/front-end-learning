function debounce(fn, wait) {
  let timer = null;
  return function (...rest) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.call(this, ...rest);
      timer = null;
    }, wait);
  };
}
