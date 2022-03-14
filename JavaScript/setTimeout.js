// for (var i = 0; i < 5; i++) {
//   setTimeout(
//     (j) => {
//       console.log(j);
//     },
//     i * 1000,
//     100 // 第三个参数
//   );
// }

// for (var i = 0; i < 5; i++) {
//   setTimeout(
//     (j) => {
//       console.log(j);
//     },
//     i * 1000,
//     "test"
//   );
// }

setTimeout(
  () => {
    console.log("test2");
  },
  1000,
  setTimeout(() => {
    console.log("test1");
  })
);
