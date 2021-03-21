/* eslint-disable prefer-destructuring */
// Stwórzmy aplikację która pobiera 2 parametry a i b z adresu url
// i wykona mnożenie w naszej aplikacji. Rezultat działania powinniśmy
// wysłać do użytkownika końcowego(klienta).

const http = require('http');

function convertParams(url) {
  const params = Array.from(url.searchParams.entries());
  return params.reduce((acc, param) => {
    acc[param[0]] = param[1];
    return acc;
  }, {});
}

function vaildParams(arr) {
  return arr.every((param) => !Number.isNaN(+param));
}

http
  .createServer((req, res) => {
    const url = new URL(`http://${req.headers.location}${req.url}`);
    const { a, b } = convertParams(url);
    res.setHeader('Content-Type', 'text/plain');
    if (vaildParams([a, b])) {
      res.writeHead(200);
      res.write(`${+a * +b}`);
    } else {
      res.writeHead(400);
      res.write('Bad request');
    }
    res.end();
  })
  .listen(4700);
