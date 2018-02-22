// Used for JSON responses
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// Creates response based on content type
const createResponse = (request, response, responseObj, type, status) => {
  respondJSON(request, response, status, responseObj);
};

// Called on a successful request
const success = (request, response, params, acceptedTypes) => {
  const successObj = {
    message: 'Successful response!',
    type: 'Success',
  };

  createResponse(request, response, successObj, acceptedTypes, 200);
};

// Called when a page cannnot be found
const notFound = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'The page you could not be found',
    type: 'notFound',
    id: 'notFound',
  };

  createResponse(request, response, responseObj, acceptedTypes, 404);
};

// Called when there is a bad request
const badRequest = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'Contains valid parameters',
    type: 'Bad Request',
  };

  // Checks for valid parameters and adjusts response accordingly
  if (!params.valid || params.valid !== 'true') {
    responseObj.message = 'Missing valid query parameter, needs to be set to true';
    responseObj.id = 'badRequest';
    createResponse(request, response, responseObj, acceptedTypes, 400);
  } else {
    createResponse(request, response, responseObj, acceptedTypes, 200);
  }
};

// Called when there is an unauthorized request
const unauthorized = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'Unauthorized to use this page',
    type: 'Unauthorized',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseObj.message = 'Missing loggedIn query parameter set to yes';
    responseObj.id = 'Unauthorized';
    createResponse(request, response, responseObj, acceptedTypes, 401);
  } else {
    createResponse(request, response, responseObj, acceptedTypes, 200);
  }
};

// Called when there is a forbidden request
const forbidden = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'You do not have access to this content',
    id: 'forbidden',
    type: 'forbidden',
  };

  createResponse(request, response, responseObj, acceptedTypes, 403);
};

// Called when there is an internal server error
const internalError = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'InternalError',
    type: 'InternalError',
  };

  createResponse(request, response, responseObj, acceptedTypes, 500);
};

const notImplemented = (request, response, params, acceptedTypes) => {
  const responseObj = {
    message: 'A get request for this page has not been implemented yet. Check later.',
    id: 'notImplemented',
    type: 'notImplemented',
  };

  createResponse(request, response, responseObj, acceptedTypes, 501);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalError,
  notImplemented,
  notFound,
};
