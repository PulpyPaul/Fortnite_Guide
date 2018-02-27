// File System
const fs = require('fs');

// HTML/CSS references
const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/..//hosted/css/style.css`);
const materializeCSS = fs.readFileSync(`${__dirname}/../hosted/css/materialize.min.css`);
const jsBundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);
const materializeJS = fs.readFileSync(`${__dirname}/../hosted/js/materialize.min.js`);

// Gets the index page
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Gets the css page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getMaterializeCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(materializeCSS);
  response.end();
};

const getMaterializeJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(materializeJS);
  response.end();
};

// Gets the bundled js
const getBundle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(jsBundle);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getBundle,
  getMaterializeCSS,
  getMaterializeJS,
};
