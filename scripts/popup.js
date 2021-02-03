
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

// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(10, 50, 320, 200);

// Creates circle at x = 50, y = 40, with radius 10
var circle = paper.circle(50, 40, 10);
// Sets the fill attribute of the circle to red (#f00)
circle.attr("fill", "#f00");

// Sets the stroke attribute of the circle to white
circle.attr("stroke", "#fff");

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
