// Zmodyfikujmy naszą aplikację tak by zwracała różny komunikat
// i status odpowiedzi w zależności od użytej metody http

const http = require('http');

http
  .createServer((req, res) => {
    const { method } = req;
    res.setHeader('Content-Type', 'text/plain');
    switch (method) {
      case 'GET':
        res.writeHead(200);
        res.write('Here is your content');
        break;
      case 'POST':
        res.writeHead(201);
        res.write('Successfully created file');
        break;
      case 'DELETE':
        res.writeHead(202);
        res.write('Content will be deleted');
        break;
      default:
        res.writeHead(405);
        res.write('Method not supported');
        break;
    }
    res.end();
  })

  .listen(4700);
