// Send out current tab to RememberThis.

var postTo = 'http://localhost:3000/capture'

function ajax(options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(options.data));

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            return callback(xhr)
        }
    }
}

// Handle server response.
function handleResponse(response) {
    console.log('response', response);
}

function pushPage(message) {
	console.log('push page message', message);

    var now = new Date,
        data = {
            'title': message.title,
            'url': message.url,
            'body': message.body,
            'date': now,
            'uid' : 1,
    };

    // POST
    console.log('making post to ', postTo, 'with', data);
    ajax({
        url: postTo,
        method: 'POST',
        data : data,
    }, handleResponse);

}

// Reads the current page on the active tab.
function readPage(callback) {

    console.log('exectuting injected');
	chrome.tabs.executeScript(null, { 
		file: 'injected.js',
	});

    console.log('done');

    console.log('on message');
    chrome.runtime.onMessage.addListener(function(message)  { 

        console.log('before callback message');
        callback(message); 
    }); 	
}

// Runs on extension click.
chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.runtime.getBackgroundPage(function(eventPage) {
		console.log('event page', eventPage);

		eventPage.readPage(pushPage);
	});
});
