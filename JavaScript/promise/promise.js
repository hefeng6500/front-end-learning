'use strict';

// 1、基本架构：
//   状态
//   then
//   执行器函数 executor

// 2、executor、resolve、reject
// 3、then 同步下调用
// 4、then 异步下调用
// 5、then 链式调用
//   返回 Promise
//   then 函数递归返回常量结果，供下个 then 使用
//   考虑 then 成功的回调为 null 的情况

class Promise$1 {
  static PENDING = "pending";
  static RESOLVED = "resolved";
  static REJECTED = "rejected";

  static resolve() {}

  constructor(executor) {
    this.state = Promise$1.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (value instanceof Promise$1) {
        return value.then(resolve, reject);
      }

      if (this.state === Promise$1.PENDING) {
        this.state = Promise$1.RESOLVED;
        this.value = value;

        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      this.state = Promise$1.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn());
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let promise = new Promise$1((resolve, reject) => {
      if (this.state === Promise$1.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }

      if (this.state === Promise$1.RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === Promise$1.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return promise;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // let promise = new Promise((resolve) => {
  //   resolve(1);
  // }).then((res) => {
  //   return promise;
  // });

  if (x === promise) {
    throw TypeError("循环引用");
  }

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called;

    try {
      let then = x.then;

      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // x: { then: {} }
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 返回了常量，直接 resolve
    resolve(x);
  }
}

const p = new Promise$1((resolve, reject) => {
  resolve(
    new Promise$1((resolve) => {
      resolve(1);
    })
  );
});

p.then((res) => {
  console.log(res + " succeed");
  return res;
})
  .then((res) => {
    console.log("链式调用1: ", res);
    return res;
  })
  .then((res) => {
    console.log("链式调用2: ", res);
    return res;
  })
  .then((res) => {
    console.log("链式调用3: ", res);
  });

  Promise$1.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise$1((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  };
  
  module.exports = Promise$1;
