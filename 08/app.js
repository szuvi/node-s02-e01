/* eslint-disable prefer-destructuring */
// Napiszmy aplikacja która zwróci wszystkie parametry podane w url.
// Zwracany rezultat powinien być obiektem i mieć
// 'Content-type':'application/json'

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
    const url = new URL(`http://${req.headers.location}${req.url}`);
    const params = convertParams(url);

    if (req.method !== 'GET') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Incorrect method!');
    }

    if (Object.keys(params).length !== 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(params));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('No params!');
    }
    res.end();
  })
  .listen(4700);
