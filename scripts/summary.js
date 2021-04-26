previousDayData = chrome.extension.getBackgroundPage().getStorageData();

function updateToday()
{
  // Grab necessary values
  let found = chrome.extension.getBackgroundPage().trackersFound;
  let blocked = chrome.extension.getBackgroundPage().trackersBlocked;
  let efficacy = chrome.extension.getBackgroundPage().efficacy;

  // Grab necessary references to HTML elements
  let foundTodayText = document.getElementById("found-today");
  let blockedTodayText = document.getElementById("blocked-today");
  let efficacyText = document.getElementById("efficacy");

  // Update UI
  foundTodayText.innerText = found.toString();
  blockedTodayText.innerText = blocked.toString();
  efficacyText.innerText = efficacy.toString() + "%";
}

function updateAlltime()
{
  // Grab necessary values and references
  let lifetimeBlocked = chrome.extension.getBackgroundPage().alltimeTotalTrackers;
  let blockedText = document.getElementById("alltime-blocked");

  //console.log(lifetimeBlocked);

  // Update UI
  blockedText.innerText = lifetimeBlocked;
}

function updateTrend()
{
  // need 24h data, but lets assume these are the values for now
  let prevBlocked = 500;

  let todayBlocked = chrome.extension.getBackgroundPage().trackersBlocked;

  let trendBlocked = Math.round(((todayBlocked - prevBlocked) / prevBlocked) * 100);

  var trendImg = document.getElementById("trend-img");
  var trendText = document.getElementById("trend");

  if (trendBlocked > 0)
  {
    trendImg.classList.toggle("arrowRed");
    trendImg.src = "/images/arrow_red.png";
    trendText.classList.toggle("trendNegative");
    trendText.innerText = "+" + trendBlocked.toString() + "%";
  }
  else
  {
    trendImg.classList.toggle("arrowGreen");
    trendImg.src = "/images/arrow_green.png";
    trendText.classList.toggle("trendPositive");
  }

  trendText.innerText = trendBlocked.toString() + "%";
}

updateToday();
updateAlltime();
updateTrend();
