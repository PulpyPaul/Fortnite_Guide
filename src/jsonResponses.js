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

// Returns a response of the game logs
const getGameLog = (request, response) => {
  const responseJSON = {
    gameLogs,
  };

  respondJSON(request, response, 200, responseJSON);
};

// Creates a new game log card
const addGameLog = (request, response, body) => {
  // Default message
  const responseJSON = {
    message: 'Name is required, notes are optional',
  };

    // Checks if the name field is added
  if (body.name === '') {
    responseJSON.id = 'missing Name Field';
    return respondJSON(request, response, 400, responseJSON);
  }

  const responseCode = 201;

  const gameNumber = `gameNumber${gameIndex}`;

  // Adds necessary data to game logs object
  gameLogs[gameNumber] = {};
  gameLogs[gameNumber].name = body.name;
  gameLogs[gameNumber].number = gameIndex;
  gameLogs[gameNumber].cause = body.cause;
  gameLogs[gameNumber].surroundings = body.surroundings;
  gameLogs[gameNumber].notes = body.notes;

  gameIndex++;

  responseJSON.gameLogs = gameLogs;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSON(request, response, responseCode, responseJSON);
};

module.exports = {
  getGameLog,
  addGameLog,
};
