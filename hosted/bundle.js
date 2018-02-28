"use strict";

var handleResponse = function handleResponse(xhr) {
  var content = document.querySelector('#cards');

  //check the status code
  switch (xhr.status) {
    case 200:
      //success
      Materialize.toast("Success!", 4000);
      break;
    case 201:
      //created
      Materialize.toast("Created!", 4000);
      break;
    case 204:
      //updated 
      Materialize.toast("Updated!", 4000);
      return;
    case 400:
      //bad request
      Materialize.toast("Bad Request!", 4000);
      break;
    default:
      //any other status code
      Materialize.toast("Not Implemented by Client!", 4000);
      break;
  }

  parseJSON(xhr, content);
};

var parseJSON = function parseJSON(xhr, content) {

  //parse response 
  var obj = JSON.parse(xhr.response);

  //if users in response, add to screen
  if (obj.gameLogs && xhr.status == 200) {

    // clear out all the elements in the cards div
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }

    // Create a card for each game log
    for (var x = 0; x < Object.keys(obj.gameLogs).length; x++) {

      // Creates a new row
      var row = document.createElement('div');
      row.className = "row";
      content.appendChild(row);

      // Creates a container for the card
      var cardContainer = document.createElement('div');
      cardContainer.className = "col s12 m6";
      row.appendChild(cardContainer);

      // Creates the card
      var card = document.createElement('div');
      card.className = "card grey darken-2";
      cardContainer.appendChild(card);

      // Creates the card content
      var cardContent = document.createElement('div');
      cardContent.className = "card-content white-text";
      card.appendChild(cardContent);

      // Creates the card title
      var cardTitle = document.createElement('span');
      cardTitle.className = "card-title";
      cardTitle.textContent = "Name: " + obj.gameLogs["gameNumber" + (x + 1)].name;
      cardContent.appendChild(cardTitle);

      // Creates the card paragraph
      var cardParagraph = document.createElement('p');
      cardParagraph.textContent = "Cause of Death: " + obj.gameLogs["gameNumber" + (x + 1)].cause + "\nSurroundings: " + obj.gameLogs["gameNumber" + (x + 1)].surroundings + "\nAdditional Notes: " + obj.gameLogs["gameNumber" + (x + 1)].notes;
      cardContent.appendChild(cardParagraph);
    }
  }
};

// Sends a post request to server
var sendPost = function sendPost(e, formObject) {

  // Gets the form action/method
  var formAction = formObject.getAttribute('action');
  var formMethod = formObject.getAttribute('method');

  // Gets the cause of death and surroundings dropdown menus
  var causeDropdown = formObject.querySelector('#causeSelectElement');
  var surroundingDropdown = formObject.querySelector('#surroundingSelectElement');

  // Gets the selected option within the dropdown element
  var causeField = causeDropdown.options[causeDropdown.selectedIndex].value;
  var surroundingField = surroundingDropdown.options[surroundingDropdown.selectedIndex].value;

  // Gets the notes and name input fields
  var nameField = formObject.querySelector('#nameInput').value;
  var notesField = formObject.querySelector('#notesElement').value;

  //create a new Ajax request
  var xhr = new XMLHttpRequest();

  //set the method (POST) and url (action field from form)
  xhr.open(formMethod, formAction);

  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  //set our requested response type in hopes of a JSON response
  xhr.setRequestHeader('Accept', 'application/json');

  //set our function to handle the response
  xhr.onload = function () {
    return handleResponse(xhr);
  };

  var formData = "name=" + nameField + "&cause=" + causeField + "&surroundings=" + surroundingField + "&notes=" + notesField;

  //send our request with the data
  xhr.send(formData);

  //prevent the browser's default action (to send the form on its own)
  e.preventDefault();

  //return false to prevent the browser from trying to change page
  return false;
};

var sendGet = function sendGet(e, getLogsButton) {

  // Gets action and method
  var buttonAction = getLogsButton.getAttribute('action');
  var buttonMethod = getLogsButton.getAttribute('method');

  // Creates and sends proper get request
  var xhr = new XMLHttpRequest();
  xhr.open(buttonMethod, buttonAction);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = function () {
    return handleResponse(xhr);
  };
  xhr.send();

  //cancel browser's default action
  e.preventDefault();

  //return false to prevent page redirection from a form
  return false;
};

var init = function init() {

  // Main form on the top of the page
  var survivalForm = document.querySelector('#survivalForm');

  // Button to used to send a get request
  var getLogsButton = document.querySelector('#showLogs');

  // Event to send a post request to create a game log
  var addGameLog = function addGameLog(e) {
    return sendPost(e, survivalForm);
  };
  survivalForm.addEventListener('submit', addGameLog);

  // Event to send a get request to display game logs
  var showGameLogs = function showGameLogs(e) {
    return sendGet(e, getLogsButton);
  };
  getLogsButton.onclick = showGameLogs;

  // Initialization necessary for materialize select functionality
  $(document).ready(function () {
    $('select').material_select();
  });
};

window.onload = init;
