var enabled = true;

var trackersFound = 0;
var trackersBlocked = 0;
var trackerUrls = [];
var totalTrackers = 0;
var lastURL = "";
var newURL = "";

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

chrome.webNavigation.onBeforeNavigate.addListener(
  function()
  {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs)
    {
      // Get tab url
      lastURL = tabs[0].url;
    });
    //printDebug();
  }
);

chrome.webNavigation.onCompleted.addListener(
  function()
  {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs)
    {
      // Get tab url
      newURL = tabs[0].url;

      if (!(newURL === lastURL))
      {
        trackersFound = 0;
        trackersBlocked = 0;
        trackerUrls = [];
      }
    });
    //printDebug();
  }
);

// debug stuff
function printDebug()
{
  console.log("Trackers found:" + trackersFound);
  console.log("Trackers blocked:" + trackersBlocked);
  console.log("Trackers urls:" + trackerUrls);
  console.log("Total trackers: " + totalTrackers);
}
