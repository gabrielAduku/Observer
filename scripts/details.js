var infoBox = document.getElementById("info");

var trackersFound = chrome.extension.getBackgroundPage().trackersFound;
var trackersBlocked = chrome.extension.getBackgroundPage().trackersBlocked;
var trackerUrls = chrome.extension.getBackgroundPage().trackerUrls;

document.getElementById("trackersFound").innerHTML = 'Observer found <span class="highlight">' + trackersFound + '</span> trackers on this website...';
document.getElementById("trackersBlocked").innerHTML = '...and has blocked <span class="highlight">' + trackersBlocked + '</span> of them.';

// Max length the tracker's URL can be inside of the list
var maxLength = 35;

for (var i = 0; i < trackerUrls.length; i++)
{
  // Create a checkbox element for each tracker and fill in details
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "domain";
  checkbox.value = "block";
  checkbox.checked = true;
  checkbox.id = trackerUrls[i];

  // Shorten strings if needed
  var trackerString = trackerUrls[i];
  if (trackerString.length > maxLength)
  {
    trackerString = trackerString.substr(0, maxLength) + "...";
  }

  // Attach label to checkbox
  var label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.appendChild(document.createTextNode(trackerString));
  label.innerHTML += "<br/>";

  infoBox.appendChild(checkbox);
  infoBox.appendChild(label);
}

document.getElementById("confirm-changes").addEventListener("click", function()
{
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  var exempt_list = [];

  for (var i = 0; i < checkboxes.length; i++)
  {
    if (checkboxes[i].checked == false)
    {
      exempt_list.push(checkboxes[i].id);
    }
  }

  if (exempt_list.length == 0) {return;}

  chrome.extension.getBackgroundPage().storeExemptList({"exempt_list": exempt_list});
  chrome.extension.getBackgroundPage().refreshExemptList();
});
