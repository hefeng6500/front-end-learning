Function.prototype.before = function (fn) {
  var self = this;
  return function () {
    fn.apply(this, arguments);
    return self.apply(this, arguments);
  };
};

Function.prototype.after = function (fn) {
  var self = this;
  return function () {
    var result = self.apply(this, arguments);
    fn.apply(this, arguments);
    return result;
  };
};

function bar() {
  console.log("是谁在昭明书院风度翩翩");
}
var foo = bar
  .before(function () {
    console.log("是谁在逢源桥上惊鸿一现");
  })
  .after(function () {
    console.log("小桥流水");
  });
foo();
// 是谁在逢源桥上惊鸿一现
// 是谁在昭明书院风度翩翩
// 小桥流水
