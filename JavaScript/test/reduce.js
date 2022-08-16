Array.prototype.reduce = function (callback, initialValue) {
  const length = this.length;
  let acc = typeof initialValue === "undefined" ? this[0] : initialValue;
  let i = typeof initialValue === "undefined" ? 1 : 0;

  for (; i < length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

console.log([1, 2, 3].reduce((acc, cur) => acc + cur));
