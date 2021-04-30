// Controls Observer's on/off switch
var enabled = true;

// Controls today's trackers' values
var trackersFound = 0;
var trackersBlocked = 0;
var trackerUrls = [];
var efficacy = 0;

// Controls 24h trackers' values
var prevTrackersFound = 0;
var prevTrackersBlocked = 0;

// Controls update scheduling
var updateSchedule = new Date();
var nextUpdate = 0;

// Stores alltime total trackers value
var alltimeTotalTrackers = 0;

// keys for values
var alltimeTotalTrackers_k = "alltimeTotalTrackers";
var prevTrackersFound_k = "prevTrackersFound";
var prevTrackersBlocked_k = "prevTrackersBlocked";

var lastURL = "";
var newURL = "";

var exempt_list = [];

function storeExemptList(content)
{
  chrome.storage.local.set(content, function() {
    console.log("Updated Exempt List Successfully!");
  });
}

function refreshExemptList()
{
  chrome.storage.local.get("exempt_list", function(result) {
    exempt_list = result.exempt_list;
    console.log(exempt_list);
  });
}

// Accesses and stores data into the browser's storage
// @param force toggles a force update
function updateStorageData(force=false, alltime=alltimeTotalTrackers, found=trackersFound, blocked=trackersBlocked)
{
  if (!force)
  {
    // Only execute if 24h have passed
    let timeNow = new Date();
    if (+timeNow >= +nextUpdate)
    {
      console.log("updating summary");
      nextUpdate = new Date(+timeNow + 1000 * 60 * 60 * 24);
    }
    else
    {
      return;
    }
  }

  console.log(updateSchedule);
  console.log(nextUpdate);

  console.log("alltime:" + alltime);
  console.log("found:" + found);
  console.log("blocked:" + blocked);

  // Define key values pairs for storage
  let content = {
    alltimeTotalTrackers_k: alltime,
    trackersFound_k:    found,
    trackersBlocked_k:  blocked
  };

  chrome.storage.local.set(content, function() {
    console.log("Updated Storage Values Successfully!");
  });

  // Refresh internal variables
  getStorageData();
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
          trackersFound++;
          trackerUrls.push(details.url);
          if (exempt_list.includes(details.url))
          {
            console.log("this one is exempt!");
            return {cancel: false}
          }

          // Change statistics
          trackersBlocked++;
          efficacy = Math.round((trackersBlocked / trackersFound) * 100);
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
