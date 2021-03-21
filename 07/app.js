/* eslint-disable prefer-destructuring */
// Rozszerzmy naszą aplikację z zadania 6 o dodatkowe działania matematyczne
// takie jak mnożenie, dzielenie i odejmowanie.
// Podzielmy zadania na odpowiednie ścieżki.

const http = require('http');

const operations = {
  add(a, b) {
    return a + b;
  },
  sub(a, b) {
    return a - b;
  },
  multi(a, b) {
    return a * b;
  },
  div(a, b) {
    return a / b;
  },
};

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
    const operation = url.pathname.slice(1);
    res.setHeader('Content-Type', 'text/plain');
    if (operations[operation] != null) {
      if (vaildParams([a, b])) {
        res.writeHead(200);
        res.write(`${operations[operation](+a, +b)}`);
      } else {
        res.writeHead(400);
        res.write('Bad request');
      }
    }

    res.end();
  })
  .listen(4700);
