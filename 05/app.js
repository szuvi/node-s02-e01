/* eslint-disable prefer-destructuring */
// Dodajmy do aplikacji zwracanie parametru name podanego w url,
// np żądanie pod adres http://localhost:4700?name=pawelpowinno
// zwrócić komunikat Hello pawel. Gdy nie podano wartości
// parametru aplikacja powinna zwrócić komunikat Hello World.

const http = require('http');

function convertParams(url) {
  const params = Array.from(url.searchParams.entries());
  return params.reduce((acc, param) => {
    acc[param[0]] = param[1];
    return acc;
  }, {});
}

http
  .createServer((req, res) => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const { method } = req;
    const { name } = convertParams(url);

    if (method === 'GET' && name != null) {
      res.writeHead(200);
      res.write(`${name}`);
    } else {
      res.writeHead(400);
      res.write('Bad Request');
    }
    res.end();
  })
  .listen(4700);
