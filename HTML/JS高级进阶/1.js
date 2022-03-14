let p = new Promise((resolve, reject) => {
  console.log(1)
  throw new Error('忘记了')
  resolve('成功')
  reject('失败')
})
p.then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})
console.log(2)