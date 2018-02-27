// Object that will serve as the database or model
const gameLogs = {};

// Index used for tipNumbers
let gameIndex = 1;

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
const getGameLog = (request, response) => {
    const responseJSON = {
      gameLogs,  
    };
    
    respondJSON(request, response, 200, responseJSON);
};

const addGameLog = (request, response, body) => {
    const responseJSON = {
        message: 'All fields are required',
    };
    
    let responseCode = 201;
    
    let gameNumber = `gameNumber${gameIndex}`;
        
    gameLogs[gameNumber] = {};
    gameLogs[gameNumber].name = body.name;
    gameLogs[gameNumber].number = gameIndex;
    gameLogs[gameNumber].cause = body.cause;
    gameLogs[gameNumber].surroundings = body.surroundings;
    gameLogs[gameNumber].notes = body.notes;
    
    gameIndex++;
    
    if (responseCode === 201) {
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }
};

module.exports = {
    getGameLog,
    addGameLog,
};
