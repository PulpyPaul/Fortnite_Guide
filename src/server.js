// Imports
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Contains all possible url requests
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/bundle.js': htmlHandler.getBundle,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internalError,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

// Handles responses
const onRequest = (request, response) => {
  // Gets parameters and parses URL
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  // Sends requests based on URL
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
