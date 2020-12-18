var enabled = true;
var trackersFound = 0;
var trackersBlocked = 0;

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log("blocking:", details.url);
        return {cancel: enabled };
    },
    {urls: blocked_domains},
    ["blocking"]
);
