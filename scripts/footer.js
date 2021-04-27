
document.getElementById('settings-icon').addEventListener("click", function ()
{
  //document.location.href = "/panels/options.html";
  if (chrome.runtime.openOptionsPage)
  {
    chrome.runtime.openOptionsPage();
  }
  else
  {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

// Flip a switch if app is enabled or not
document.getElementById('shutdown-icon').addEventListener("click", function ()
{
  let enabled = chrome.extension.getBackgroundPage().enabled;
  chrome.extension.getBackgroundPage().enabled = enabled ? false : true;

  document.getElementsByTagName("body")[0].classList.toggle("blur-filter");

  // fix this later, this is a HACK ****************************
  try
  {
    updateOnLabel();
  }

  catch (e)
  {

  }
  finally
  {
    reloadTab();
  }
});

function reloadTab()
{
  // Query all tabs, find the current tab the user is on
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs)
  {
    // reload the user's tab
    chrome.tabs.reload(tabs[0].id);
  });
}
