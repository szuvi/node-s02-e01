/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const http = require('http');

const routes = [];

function addRoute(method, path, callback) {
  routes.push({ method, path, callback });
}

function findRoute(method, path) {
  const foundRoute = routes.find(
    (route) => route.method === method && route.path === path,
  );
  if (foundRoute == null) {
    return null;
  }
  return foundRoute;
}

function get(path, callback) {
  addRoute('GET', path, callback);
}

function post(path, callback) {
  addRoute('POST', path, callback);
}

function del(path, callback) {
  addRoute('DELETE', path, callback);
}

function convertParams(url) {
  const params = Array.from(url.searchParams.entries());
  return params.reduce((acc, param) => {
    acc[param[0]] = param[1];
    return acc;
  }, {});
}

function listen(port) {
  http
    .createServer((req, res) => {
      const url = new URL(`http://${req.headers.location}${req.url}`);

      const route = findRoute(req.method, url.pathname);
      if (route != null) {
        req.params = convertParams(url);
        res.send = (content, contentType = 'text/plain', statusCode = 404) => {
          res.writeHead(statusCode, { 'Content-Type': contentType });
          res.end(content);
        };
        route.callback(req, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Incorrect Route');
      }
    })
    .listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = { get, post, del, listen };
