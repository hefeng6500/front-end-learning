console.log("start");

setImmediate(() => {
  console.log("setImmediate");
});

setTimeout(() => {
  console.log("setTimeout");
});

Promise.resolve().then(() => {
  console.log("promise");
});

process.nextTick(() => {
  console.log("nextTick");
});

// start
// end
// nextTick
// promise
// setTimeout
// setImmediate

console.log("end");
