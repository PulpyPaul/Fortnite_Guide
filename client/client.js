const handleResponse = (xhr) => {
    const content = document.querySelector('#cards');
     
    //check the status code
      switch(xhr.status) {
        case 200: //success
          Materialize.toast("Success!", 4000);
          break;
        case 201: //created
          Materialize.toast("Created!", 4000);
          break;
        case 204: //updated 
          Materialize.toast("Updated!", 4000);
          return;
        case 400: //bad request
          Materialize.toast("Bad Request!", 4000);
          break;
        default: //any other status code
          Materialize.toast("Not Implemented by Client!", 4000);
          break;
      }
    
    parseJSON(xhr, content);
};

const parseJSON = (xhr, content) => {
      
    //parse response 
    const obj = JSON.parse(xhr.response);
    
    //if users in response, add to screen
    if(obj.gameLogs && xhr.status == 200) {
        
        // clear out all the elements in the cards div
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
        
        // Create a card for each game log
        for (let x = 0; x < Object.keys(obj.gameLogs).length; x++){
            
            // Creates a new row
            const row = document.createElement('div');
            row.className = "row";
            content.appendChild(row);
            
            // Creates a container for the card
            const cardContainer = document.createElement('div');
            cardContainer.className = "col s12 m6";
            row.appendChild(cardContainer);
            
            // Creates the card
            const card = document.createElement('div');
            card.className = "card grey darken-2";
            cardContainer.appendChild(card);
            
            // Creates the card content
            const cardContent = document.createElement('div');
            cardContent.className = "card-content white-text";
            card.appendChild(cardContent);
            
            // Creates the card title
            const cardTitle = document.createElement('span');
            cardTitle.className = "card-title";
            cardTitle.textContent = `Name: ${obj.gameLogs[`gameNumber${x+1}`].name}`;
            cardContent.appendChild(cardTitle);
            
            // Creates the card paragraph
            const cardParagraph = document.createElement('p');
            cardParagraph.textContent = `Cause of Death: ${obj.gameLogs[`gameNumber${x+1}`].cause}\nSurroundings: ${obj.gameLogs[`gameNumber${x+1}`].surroundings}\nAdditional Notes: ${obj.gameLogs[`gameNumber${x+1}`].notes}`;
            cardContent.appendChild(cardParagraph);
        }
    }
};

// Sends a post request to server
const sendPost = (e, formObject) => {
    
  // Gets the form action/method
  const formAction = formObject.getAttribute('action');
  const formMethod = formObject.getAttribute('method');
  
  // Gets the cause of death and surroundings dropdown menus
  const causeDropdown = formObject.querySelector('#causeSelectElement');
  const surroundingDropdown = formObject.querySelector('#surroundingSelectElement');
    
  // Gets the selected option within the dropdown element
  const causeField = causeDropdown.options[causeDropdown.selectedIndex].value;
  const surroundingField = surroundingDropdown.options[surroundingDropdown.selectedIndex].value;
    
  // Gets the notes and name input fields
  const nameField = formObject.querySelector('#nameInput').value;
  const notesField = formObject.querySelector('#notesElement').value;
  
  //create a new Ajax request
  const xhr = new XMLHttpRequest();
    
  //set the method (POST) and url (action field from form)
  xhr.open(formMethod, formAction);
  
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
  //set our requested response type in hopes of a JSON response
  xhr.setRequestHeader ('Accept', 'application/json');
  
  //set our function to handle the response
  xhr.onload = () => handleResponse(xhr);
  
  const formData = `name=${nameField}&cause=${causeField}&surroundings=${surroundingField}&notes=${notesField}`;
  
  //send our request with the data
  xhr.send(formData);

  //prevent the browser's default action (to send the form on its own)
  e.preventDefault();
    
  //return false to prevent the browser from trying to change page
  return false;
};

const sendGet = (e, getLogsButton) => {
    
    // Gets action and method
    const buttonAction = getLogsButton.getAttribute('action');
    const buttonMethod = getLogsButton.getAttribute('method');
    
    // Creates and sends proper get request
    const xhr = new XMLHttpRequest();
    xhr.open(buttonMethod, buttonAction);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = () => handleResponse(xhr);
    xhr.send();
      
    //cancel browser's default action
    e.preventDefault();
    
    //return false to prevent page redirection from a form
    return false;
};

const init = () => {

    // Main form on the top of the page
    const survivalForm = document.querySelector('#survivalForm');
    
    // Button to used to send a get request
    const getLogsButton = document.querySelector('#showLogs'); 
    
    // Event to send a post request to create a game log
    const addGameLog = (e) => sendPost(e, survivalForm);
    survivalForm.addEventListener('submit', addGameLog);
    
    // Event to send a get request to display game logs
    const showGameLogs = (e) => sendGet(e, getLogsButton);
    getLogsButton.onclick = showGameLogs;
    
    // Initialization necessary for materialize select functionality
    $(document).ready(function() {
        $('select').material_select();
    });
};

window.onload = init;