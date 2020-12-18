var enabled = true;
var trackersFound = 0;
var trackersBlocked = 0;
var trackerUrls = [];

chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        if (enabled)
        {
          trackersFound += 1;
          trackersBlocked += 1;
          trackerUrls.push(details.url);
          return {cancel: true};
        }
        return {cancel: false };
    },
    {urls: blocked_domains},
    ["blocking"]
);
