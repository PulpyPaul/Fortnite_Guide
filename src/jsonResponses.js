// Object that will serve as the database or model
const users = {};

// Used for JSON responses that contain a body
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Used for JSON responses that don't return a body
const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end();
};

// Returns a response of the 'user' JSON object
const getUsers = (request, response) => {
    const responseJSON = {
      users,  
    };
    
    respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response, body) => {
    const responseJSON = {};
}



module.exports = {
  
};
