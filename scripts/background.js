function blockDomain(detes)
{
  console.log("Domain Blocked:", detes.url);
  return {
    cancel: true
  };
}

browser.webRequest.onBeforeRequest.addListener(
    blockDomain,
    {urls: blocked_domains},
    ["blocking"]
);
