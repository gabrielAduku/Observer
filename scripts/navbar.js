const MAIN_PAGE = "/panels/main.html";
const DETAILS_PAGE = "/panels/details.html";
const SUMMARY_PAGE = "/panels/summary.html";

window.onload = function ()
  {
    // Navbar page switching click event
    var links = document.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++)
    {
      links[i].onclick = function()
      {
        if (this.innerText === "Observer")
        {
          document.location.href = MAIN_PAGE;
        }
        else if (this.innerText === "Details")
        {
          document.location.href = DETAILS_PAGE;
        }
        else if (this.innerText === "Summary")
        {
          document.location.href = SUMMARY_PAGE;
        }
      };
    }
  }
