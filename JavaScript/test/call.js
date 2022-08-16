Function.prototype.call = function (context, ...rest) {
  // 借助函数调用 this 指向的隐式上下文
  const key = Symbol();

  context[key] = this;

  const result = context[key](...rest);

  delete context[key];

  return result;
};

function test() {
  console.log(this.name);
}

const obj = {
  name: "123",
};

test.call(obj);
