// Send out current tab to RememberThis.

function pushPage(message) {
	console.log('push page message', message);
}

function readPage(callback) {
	chrome.tabs.executeScript(null, { 
		file: 'injected.js',
	});
        
        chrome.runtime.onMessage.addListener(function(message)  { 
                callback(message); 
        }); 	
}

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.runtime.getBackgroundPage(function(eventPage) {
		console.log('event page', eventPage);

		eventPage.readPage(pushPage);
	});
});
