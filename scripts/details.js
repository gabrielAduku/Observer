var infoBox = document.getElementById("info");

var trackersFound = chrome.extension.getBackgroundPage().trackersFound;
var trackersBlocked = chrome.extension.getBackgroundPage().trackersBlocked;
var trackerUrls = chrome.extension.getBackgroundPage().trackerUrls;

for (var i = 0; i < trackerUrls.length; i++)
{
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "domain";
  checkbox.value = "block";
  checkbox.id = "cb" + i;

  var label = document.createElement("label");
  label.htmlFor = "id";
  label.appendChild(document.createTextNode(trackerUrls[i] + "\n"));

  infoBox.appendChild(checkbox);
  infoBox.appendChild(label);
}
