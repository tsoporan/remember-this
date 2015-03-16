// Send out current tab to RememberThis.

var postToURL = 'http://localhost:3000/capture',
    user_id;

function pushPage(message) {
    var data = {
            'title': message.title,
            'url': message.url,
            'body': message.body,
            'date': new Date,
            'user_id' : user_id,
    };

    // POST
    console.log('making post to ', postToURL, 'with', data);

    // Chrome 42 - Fetch, replaces XHMHttpRequest
    fetch(postToURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data,
    })
    .then(function(data) {
        console.log('success with json', data);
    })
    .catch(function(error) {
        console.log('request failed', error);
    });
}

function readPage(tab) {
        console.log('reading page');
        chrome.tabs.executeScript(tab.id, {
            file: 'injected.js',
        });
}

function init(tab) {

    console.log('init');

    // Get the user first.
    chrome.storage.sync.get('userid', function(items) {

        console.log('storage get', items);

        if (chrome.runtime.lastError)  {
            console.log('error', chrome.runtime.lastError);
        } else {
            user_id = items.userid;

            if (!user_id) {

                user_id = 1; // TODO: generate this
        
                console.log('no user id, setting', user_id);

                chrome.storage.sync.set({ 'userid': user_id }, function() {
                    readPage(tab);       
                });

            } else {
                console.log('user id found', user_id);
                readPage(tab);
            }

        }
    });
}

// Runs on extension click.
chrome.browserAction.onClicked.addListener(init); 

// Fed back page data from injected.
chrome.runtime.onMessage.addListener(function(message) {
    pushPage(message);
});
