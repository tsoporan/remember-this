// Send out current tab to RememberThis.

var codea = "";

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: ''
  });
});
