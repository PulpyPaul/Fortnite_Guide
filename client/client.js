const handleResponse = (xhr) => {
    const content = document.querySelector('#content');
     
    //check the status code
      switch(xhr.status) {
        case 200: //success
          content.innerHTML = `<b>Success</b>`;
          break;
        case 201: //created
          content.innerHTML = '<b>Create</b>';
          break;
        case 204: //updated (no response back from server)
          content.innerHTML = '<b>Updated (No Content)</b>';
          return;
        case 400: //bad request
          content.innerHTML = `<b>Bad Request</b>`;
          break;
        default: //any other status code
          content.innerHTML = `Error code not implemented by client.`;
          break;
      }
    
    parseJSON(xhr, content);
};

const parseJSON = (xhr, content) => {
      
    //parse response (obj will be empty in a 204 updated)
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
    
    //if users in response, add to screen
    if(obj.tips) {
        const tipsList = document.createElement('p');
        const tips = JSON.stringify(obj.tips);
        tipsList.textContent = tips;
        content.appendChild(tipsList);
    }
};

//function to send our post request
const sendPost = (e, survivalForm) => {
    
  //grab the forms action (url to go to)
  //and method (HTTP method - POST in this case)
  const causeAction = survivalForm.getAttribute('action');
  const causeMethod = survivalForm.getAttribute('method');
  
  //grab the form's name and age fields so we can check user input
  const causeField = survivalForm.querySelector('#causeField');
  
  //create a new Ajax request (remember this is asynchronous)
  const xhr = new XMLHttpRequest();
    
  //set the method (POST) and url (action field from form)
  xhr.open(nameMethod, nameAction);
  
  //set our request type to x-www-form-urlencoded
  //which is one of the common types of form data. 
  //This type has the same format as query strings key=value&key2=value2
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
  //set our requested response type in hopes of a JSON response
  xhr.setRequestHeader ('Accept', 'application/json');
  
  //set our function to handle the response
  xhr.onload = () => handleResponse(xhr);
  
  //build our x-www-form-urlencoded format. Without ajax the 
  //browser would do this automatically but it forcefully changes pages
  //which we don't want.
  //The format is the same as query strings, so key=value&key2=value2
  //The 'name' fields from the inputs are the variable names sent to
  //the server. 
  //So ours might look like  name=test&age=22
  //Again the 'name' fields in the form are the variable names in the string
  //and the variable names the server will look for.
  const formData = `cause=${causeField.value}`;
  
  //send our request with the data
  xhr.send(formData);

  //prevent the browser's default action (to send the form on its own)
  e.preventDefault();
    
  //return false to prevent the browser from trying to change page
  return false;
};

     
const init = () => {
   
    const survivalForm = document.querySelector('#survivalForm');
    
    const addTip = (e) => sendPost(e, survivalForm);
    
    survivalForm.addEventListener('submit', addTip);
};

window.onload = init;