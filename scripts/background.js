var enabled = true;

var trackersFound = 0;
var trackersBlocked = 0;
var trackerUrls = [];
var totalTrackers = 0;

chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        if (enabled)
        {
          trackersFound++;
          trackersBlocked++;
          trackerUrls.push(details.url);
          totalTrackers++;

          return {cancel: true};
        }
        return {cancel: false };
    },
    {urls: blocked_domains},
    ["blocking"]
);
