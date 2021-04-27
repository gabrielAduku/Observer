// Controls Observer's on/off switch
var enabled = true;

// Controls today's trackers' values
var trackersFound = 0;
var trackersBlocked = 0;
var trackerUrls = [];
var efficacy = 0;

// Controls 24h trackers' values
var prevTrackersFound = 2;
var prevTrackersBlocked = 3;

// Controls update scheduling
var updateSchedule = new Date();
var nextUpdate = 0;

// Stores alltime total trackers value
var alltimeTotalTrackers = 1;

// keys for values
var alltimeTotalTrackers_k = "alltimeTotalTrackers";
var prevTrackersFound_k = "prevTrackersFound";
var prevTrackersBlocked_k = "prevTrackersBlocked";

var lastURL = "";
var newURL = "";

// Accesses and stores data into the browser's storage
// @param force toggles a force update
function updateStorageData(force=false, alltime=alltimeTotalTrackers, found=prevTrackersFound, blocked=prevTrackersBlocked)
{
  if (!force)
  {
    // Only execute if 24h have passed
    let timeNow = new Date();
    if (!(+timeNow >= +nextUpdate))
    {
      return;
    }
    nextUpdate = new Date(+updateSchedule + 1000 * 60 * 60 * 24);
  }

  console.log(updateSchedule);
  console.log(nextUpdate);

  // Define key values pairs for storage
  let content = {
    alltimeTotalTrackers_k: alltime,
    trackersFound_k:    found,
    trackersBlocked_k:  blocked
  };

  chrome.storage.local.set(content, function() {
    console.log("Updated Storage Values Successfully!");
  });
}

// Accesses the browser's storage and retrieves data
function getStorageData()
{
  // define array of keys to grab information
  let keys = ['alltimeTotalTrackers_k', 'trackersFound_k', 'trackersBlocked_k'];
  chrome.storage.local.get(keys, function(result)
  {
    console.log(result);
    alltimeTotalTrackers = result.alltimeTotalTrackers_k;
    prevTrackersFound = result.trackersFound_k;
    prevTrackersBlocked = result.trackersBlocked_k;

  });
}

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
        /*
        console.log("resetting counters...");
        trackersFound = 0;
        trackersBlocked = 0;
        trackerUrls = [];
        */
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
