Function.prototype.bind = function (context, ...args) {
  const self = this;
  const fn = function (...newArgs) {
    return self.apply(context, [...args, ...newArgs]);
  };

  fn.prototype = Object.create(this.prototype);

  return fn;
};
