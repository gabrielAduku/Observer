// Controls Observer's on/off switch
var enabled = true;

// Controls today's trackers values
var trackersFound = 0;
var trackersBlocked = 0;
var trackerUrls = [];
var efficacy = 0;

// Stores alltime total trackers value
var alltimeTotalTrackers = 0;

var lastURL = "";
var newURL = "";

/*
  webRequest.onBeforeRequest()
    Fires before a request is made.
    Add a listener to handling requests before they occur.
    Syntax: addListener(callback, filter, optionalInfo)
*/
chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        if (enabled)
        {
          // Change statistics
          trackersFound++;
          trackersBlocked++;
          trackerUrls.push(details.url);
          efficacy = trackersFound / trackersBlocked * 100;
          alltimeTotalTrackers++;

          // Return true/false to block/unblock
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

// Fix this, sometimes onCompleted does not trigger
chrome.webNavigation.onCompleted.addListener(
  function()
  {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs)
    {
      // Get tab url
      newURL = tabs[0].url;

      if (!(newURL === lastURL))
      {
        console.log("resetting counters...");
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
