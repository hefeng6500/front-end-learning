function myNew(fn, ...rest) {
  const obj = Object.create(fn.prototype);

  const temp = fn.call(obj, ...rest);

  return temp instanceof Object ? temp : obj;
}
