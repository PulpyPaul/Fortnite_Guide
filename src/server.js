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

//handle POST requests
const handlePost = (request, response, parsedUrl) => {
  //if post is to /addUser (our only POST url)
  if (parsedUrl.pathname === '/sendGameLog') {
    const res = response;

    //uploads come in as a byte stream that we need 
    //to reassemble once it's all arrived
    const body = [];

    //if the upload stream errors out, just throw a
    //a bad request and send it back 
    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    //on 'data' is for each byte of data that comes in
    //from the upload. We will add it to our byte array.
    request.on('data', (chunk) => {
      body.push(chunk); 
    });

    //on end of upload stream. 
    request.on('end', () => {
      //combine our byte array (using Buffer.concat)
      //and convert it to a string value (in this instance)
      const bodyString = Buffer.concat(body).toString();
      //since we are getting x-www-form-urlencoded data
      //the format will be the same as querystrings
      //Parse the string into an object by field name
      const bodyParams = query.parse(bodyString);

      //pass to our addUser function
      jsonHandler.addGameLog(request, res, bodyParams);
    });
  }
};

//handle GET requests
const handleGet = (request, response, parsedUrl) => {
  //route to correct method based on url
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getGameLog') {
    jsonHandler.getGameLog(request, response);
  } else if (parsedUrl.pathname === '/bundle.js'){
    htmlHandler.getBundle(request, response);
  } else if (parsedUrl.pathname === '/materialize.min.css'){
    htmlHandler.getMaterializeCSS(request, response);
  } else if (parsedUrl.pathname === '/materialize.min.js'){
    htmlHandler.getMaterializeJS(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// Handles responses
const onRequest = (request, response) => {
  
  //parse url into individual parts
  //returns an object of url parts by name
  const parsedUrl = url.parse(request.url);

  //check if method was POST, otherwise assume GET 
  //for the sake of this example
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
