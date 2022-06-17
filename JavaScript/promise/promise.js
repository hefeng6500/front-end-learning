'use strict';

class Promise$1 {
  static resolve() {}
  static reject() {}

  static PENDING = "pending";
  static RESOLVED = "resolved";
  static REJECTED = "rejected";

  constructor(exector) {
    this.state = Promise$1.PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === Promise$1.PENDING) {
        this.value = value;
        this.state = Promise$1.RESOLVED;
        this.onResolvedCallbacks.forEach((fn) => fn(this.value));
      }
    };
    const reject = (reason) => {
      if (this.state === Promise$1.PENDING) {
        this.reason = reason;
        this.state = Promise$1.REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulFilled, onRejected) {
    // 针对 then 传入的回调函数为 null 的情况，直接将值返回
    // p.then(null).then((res) => {
    //   console.log(res);
    // });
    onFulFilled =
      typeof onFulFilled === "function" ? onFulFilled : (value) => value;

    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 实现链式调用
    let promise = new Promise$1((resolve, reject) => {
      if (this.state === Promise$1.PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
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
          }, 0);
        });
      }

      if (this.state === Promise$1.RESOLVED) {
        setTimeout(() => {
          try {
            // 上一个 then 函数里面可能有很多逻辑
            // 可能报错
            // 可能返回一个固定值
            // 可能返回一个同步的 promise
            // 可能返回一个异步的 promise

            let x = onFulFilled(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === Promise$1.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
    });

    return promise;
  }

  catch() {}
}

function resolvePromise(promise, x, resolve, reject) {
  // let promise = new Promise((resolve) => {
  //   resolve(1);
  // }).then(() => {
  //   return promise;
  // });

  // 出现循环引用
  if (x === promise) {
    reject(
      new TypeError("TypeError: Chaining cycle detected for promise #<Promise>")
    );
  }

  // 加锁，防止别人的 promise 不遵守 "状态一旦被修改不可再变化"
  let called = false;

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;

      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 如果返回的 promise 还是一个 promise
            // 递归解析 y 的值，直至为常量为止
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 带有then的对象
        // x: {
        //   then: {}
        // }
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      // 有可能 x.then 的时候报错
      reject(error);
    }
  } else {
    // 上一个 then return 了普通值
    resolve(x);
  }
}

Promise$1.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise$1((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise$1;
