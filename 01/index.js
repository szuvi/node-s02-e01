// Stwórzmy pierwszą aplikację serwerową wykorzystując wbudowany moduł HTTP,
// który wyśle do naszego klienta przywitanie.
// Sprawdźmy czy działa aplikacja poprzez uruchomienie przeglądarki
// i wysłanie żądania do naszego serwera (port 4700)

const http = require('http');

http
  .createServer((req, res) => {
    res.end('Hello!');
  })
  .listen(4700);
