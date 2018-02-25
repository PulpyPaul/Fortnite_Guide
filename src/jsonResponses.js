// Object that will serve as the database or model
const tips = {};

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
const getTips = (request, response) => {
    const responseJSON = {
      tips,  
    };
    
    respondJSON(request, response, 200, responseJSON);
};

const addTips = (request, response, body) => {
    const responseJSON = {
        message: 'All fields are required',
    };
    
    if (!body.cause) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }
    
    let responseCode = 201;
    
    let tipNumber = `tip${Object.keys(tips).length}`;
    
    tips[body.tipNumber] = {};
    tips[body.tipNumber].cause = body.cause;
    
    console.dir(tips);
    
    if (responseCode === 201) {
        responseJSON.message = 'Created Successfully';
        return respondJSON(request, response, responseCode, responseJSON);
    }
};



module.exports = {
    getTips,
    addTips,
};
