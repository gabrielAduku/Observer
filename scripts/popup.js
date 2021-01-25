
// PROGRESS RING VARS
var ring = document.getElementById('progress-ring-circle');
var radius = ring.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

ring.style.strokeDasharray = `${circumference} ${circumference}`;
ring.style.strokeDashoffset = `${circumference}`;

function setProgRing(progress)
{
  const offset = circumference - progress / 100 * circumference;
  ring.style.strokeDashoffset = offset;
  document.getElementById('trackers-blocked-percent').textContent = progress.toString() + '%';
}

function getTrackerStats()
{
  var trackersFound = chrome.extension.getBackgroundPage().trackersFound;
  var trackersBlocked = chrome.extension.getBackgroundPage().trackersBlocked;
  var trackerUrls = chrome.extension.getBackgroundPage().trackerUrls;

  var percentBlocked = trackersFound / trackersBlocked * 100;

  if (isNaN(percentBlocked))
  {
    percentBlocked = 0;
  }

  setProgRing(70);

}

function reloadTab()
{
  // Query all tabs, find the current tab the user is on
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs)
  {
    chrome.tabs.reload(tabs[0].id);
  });
}

// functions to update views
function updateBtnLabel()
{
  // Fix this later
  //var enabled = chrome.extension.getBackgroundPage().enabled;
  //document.getElementById('disable-button').innerText = enabled ? "Disable" : "Enable";
}

updateBtnLabel();
getTrackerStats();
