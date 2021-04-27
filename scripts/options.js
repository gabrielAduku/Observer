document.getElementById('reset-button').addEventListener("click", function ()
{
  chrome.extension.getBackgroundPage().updateStorageData(true,0,0,0);
});
