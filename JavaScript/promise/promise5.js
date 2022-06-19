const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

function resolvePromise(promise2, x, resolve, reject) {
  // 解析 promise2 和 x之间的关系 来判断promise2 走 resolve 还是  reject

  // If promise and x refer to the same object
  if (promise2 === x) {
    return reject(
      new TypeError(`Chaining cycle detected for promise #<Promise> my`)
    );
  }
  // 满足这个条件才有可能说他是一个promise
  // promise 得有then方法
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called = false;
    try {
      let then = x.then; // 取值的时候发生错误(defineProperty) 那说明就不用管了，肯定不是promise
      if (typeof then === "function") {
        //  此时x 就是一个promise了
        // x.then(function(){},function())

        // 别人家的promise 可能走了成功又走了失败
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x); // 普通值直接跳过去即可
  }
}

class Promise {
  constructor(executor) {
    // 执行器函数
    this.status = PENDING; // 默认是等待态
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = []; // 成功回调
    this.onRejectedCallbacks = []; // 失败的回调

    const resolve = (value) => {
      // 调用resolve走向成功
      // 如果直接resolve了一个promise会解析他的值
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      // 调用reject走向失败
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject); // 执行executor
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (r) => {
            throw r;
          };

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            debugger
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      // 这里没有处理状态依然是pending的情况
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }

  // 增加一个catch方法 让其可以支持错误捕获，没有成功的then
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
// 延迟对象 Q
Promise.deferred = function () {
  // 产生延迟对象的方法
  // promisea+ 中提供了测试方法 会调用deferred 方法获取到 promise实例 resolve\reject
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
// 需要等待的时候 要采用的是resolve方法 并非reject
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

// finally实现
Promise.prototype.finally = function (finall) {
  return this.then(
    (value) => {
      return Promise.resolve(finall()).then(() => value);
    },
    (reason) => {
      return Promise.resolve(finall()).then(() => {
        throw reason;
      });
    }
  );
};

// npm install promises-aplus-tests -g 全局安装
// promises-aplus-tests promise.js

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // 可以将node中的异步api转化成promise
      fn(...args, function (err, data) {
        if (err) return reject(err);
        resolve(data);
      });
    });
  };
}

function promisifyAll(obj) {
  for (let key in obj) {
    if (typeof obj[key] == "function") {
      obj[key] = promisify(obj[key]);
    }
  }
}
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let result = [];
    let times = 0;
    function processMap(index, data) {
      result[index] = data;
      if (++times === values.length) {
        // 如果调用处理的方法和 我们预期的个数一样说明都解析完了
        resolve(result);
      }
    }
    // for循环是并发的 ， 异步串行都是需要递归的
    for (let i = 0; i < values.length; i++) {
      let current = values[i]; // 拿到数组的每一项
      Promise.resolve(current).then((data) => {
        // 如果有任何一个promise失败了 对于Promise.all而言就真的失败了
        processMap(i, data);
      }, reject);
    }
  });
};

Promise.allSettled = function (values) {
  return new Promise((resolve, reject) => {
    let times = 0;
    let result = [];
    function processMap(key, value) {
      result[key] = value;
      if (++times === values.length) {
        resolve(result);
      }
    }
    for (let index = 0; index < values.length; index++) {
      const current = values[index]; // 获取当前的current
      Promise.resolve(current)
        .then((value) => {
          processMap(index, { status: "fulfilled", value });
        })
        .catch((reason) => {
          processMap(index, { status: "rejected", reason });
        });
    }
  });
};

Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    values.forEach((item) => {
      Promise.resolve(item).then(resolve, reject); // 先调用会屏蔽后续调用的逻辑
    });
  });
};


// 规范中并不包括， 其他api    Promise.resolve  Promise.reject
const p = new Promise((resolve, reject) => {
  resolve(1);
});

p.then((res) => {
  console.log(res + " succeed");
  return res;
})
  .then((res) => {
    console.log("链式调用: ", res);
    debugger
    return res;
  })
  .then((res) => {
    console.log("链式调用 2： ", res);
  });