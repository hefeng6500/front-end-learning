Function.prototype.apply = function (context, array) {
  return this.call(context, ...array);
};
