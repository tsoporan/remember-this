// Send current page data.

chrome.runtime.sendMessage({
    'title': document.title,
    'url': window.location.href,
});
