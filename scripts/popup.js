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

  setProgRing(percentBlocked);

}

function reloadTab()
{
  // Query all tabs, find the current tab the user is on
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs)
  {
    chrome.tabs.reload(tabs[0].id);
  });
}

function updateOnLabel()
{
  var enabled = chrome.extension.getBackgroundPage().enabled;
  document.getElementById('status-header').innerHTML = enabled ? 'OBSERVER IS <span class="highlight">ON.</span>' : 'OBSERVER IS <span class="highlight">OFF.</span>';
}

updateOnLabel();
getTrackerStats();
chrome.extension.getBackgroundPage().updateStorageData();
