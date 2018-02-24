'use strict';

var handleResponse = function handleResponse(xhr) {
    var type = xhr.getResponseHeader('Content-type');
    var content = document.querySelector("#content");
    var h1 = document.createElement('h1');
    var p = document.createElement('p');

    if (type === 'application/json') {
        var json = JSON.parse(xhr.response);
        h1.textContent = json.type;
        p.textContent = 'Message: ' + json.message;

        console.dir(xhr.response);
        content.appendChild(h1);
        content.appendChild(p);
    }
};

var sendAjax = function sendAjax(url, acceptedType) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader("Accept", acceptedType);
    xhr.onload = function () {
        return handleResponse(xhr);
    };
    xhr.send();
};

var init = function init() {
    var button = document.querySelector("#send");
    var page = document.querySelector("#page");

    button.onclick = function () {
        var type = "application/json";
        sendAjax(page.value, "application/json");
    };
};

window.onload = init;
