// Zmodyfikujmy naszą aplikację tak by dla żądań pod adresem
// http://localhost:4700/users zwracała komunikat
// Hello from Users path a dla żądeń pod adresem
// http://localhost:4700/comments zwracała komunikat Hello from Comments path

const http = require('http');

http
  .createServer((req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const path = url.pathname;
    res.setHeader('Content-Type', 'text/plain');
    if (path === '/users') {
      res.writeHead(200);
      res.write('Hello from users path');
    } else if (path === '/comments') {
      res.writeHead(200);
      res.write('Hello from comments path');
    } else {
      res.writeHead(404);
      res.write('No content');
    }
    res.end();
  })
  .listen(4700);
