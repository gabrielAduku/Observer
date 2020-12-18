function getTrackerStats()
{
  var trackersFound = chrome.extension.getBackgroundPage().trackersFound;
  var trackersBlocked = chrome.extension.getBackgroundPage().trackersBlocked;
  var trackerUrls = chrome.extension.getBackgroundPage().trackerUrls;

  if (trackersFound == 0 && trackersBlocked == 0)
  {
    var percentBlocked = "No Trackers Found"
    var blockedDesc = "Hooray!"
  }
  else
  {
    var percentBlocked = ((trackersFound / trackersBlocked) * 100).toString() + '% trackers blocked';
    var blockedDesc = trackersFound.toString() + ' out of ' + trackersBlocked + ' found and blocked';
  }

  document.getElementById('trackers-blocked-count').innerText = percentBlocked;
  document.getElementById('trackers-blocked-description').innerText = blockedDesc;
  //console.log("Trackers found: ", trackersFound);
  //console.log("Trackers blocked: ", trackersBlocked);
  //console.log("Trackers urls: ", trackerUrls);

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
  var enabled = chrome.extension.getBackgroundPage().enabled;
  document.getElementById('disable-button').innerText = enabled ? "Disable" : "Enable";
}

window.onload = function ()
{
  // 'Disable' button click event
	document.getElementById('disable-button').onclick = function ()
  {
		var background = chrome.extension.getBackgroundPage();

    // Reverse choice, reload tab, and update the button label
		background.enabled = !background.enabled;
    reloadTab();
		updateBtnLabel();
	};

  // Navbar page switching click event
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function()
    {
      // remove classes on all elements
      for (var i = 0; i < links.length; i++)
      {
        links[i].className = ""
      }

      // re-add class to currently clicked option
      this.className = "current";
    };
  }

	updateBtnLabel();
  getTrackerStats();
}
