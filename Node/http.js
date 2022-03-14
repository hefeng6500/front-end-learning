const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end('<h1>Hello World!</h1>');
});

server.listen(8080,function () {
  console.log('server in port 8080 is start...');
})