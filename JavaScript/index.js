const promise = new Promise(function (resolve, reject) {
  // throw new Error('test');
  reject(123);
  // resolve("success")
});
promise
  .then((res) => {
    return res
  }, (error) => {
    console.log("reject", error);
  }).then(() => {
    console.log(123);
  })
  .catch(function (error) {
    console.log("catch", error);
  });
