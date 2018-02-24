const handleResponse = (xhr) => {
    const type = xhr.getResponseHeader('Content-type');
    const content = document.querySelector("#content");
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    
    if (type === 'application/json'){
        const json = JSON.parse(xhr.response);
        h1.textContent = json.type;
        p.textContent = `Message: ${json.message}`;
        
        console.dir(xhr.response);
        content.appendChild(h1);
        content.appendChild(p);
    }
};
     
const sendAjax = (url, acceptedType) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader("Accept", acceptedType);
    xhr.onload = () => handleResponse(xhr);
    xhr.send();
};
     
const init = () => {
    const button = document.querySelector("#send");
    const page = document.querySelector("#page");
            
    button.onclick = () => {
        let type = "application/json"
        sendAjax(page.value, "application/json");    
    }
};

window.onload = init;