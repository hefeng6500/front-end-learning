function delay(fn, wait, ...args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // resolve(fn(...args));

      // 相比 resolve(fn(...args)) 代码健壮性更高，如果 fn 函数报错，执行 delay 后能够得到错误信息
      Promise.resolve(fn(...args))
        .then(resolve)
        .catch(reject);
    }, wait);
  });
}

async function test() {
  let data = await delay((str) => Promise.resolve(str), 3000, "hello, world");

  console.log(data);
}

test();
