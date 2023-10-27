let jsonDataUrls = [];

chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    if (details.url.startsWith('https://api-dev.idiana.io/api/v3/work/')) {
      fetch(details.url)
        .then(response => response.json())
        .then(data => {
          if (data && typeof data === 'object' && data.uuid) {
            jsonDataUrls.push(details.url);
          }
        })
        .catch(err => {
          console.error("Error fetching or parsing JSON:", err);
        });
    }
  },
  { urls: ["https://api-dev.idiana.io/api/v3/work/*"] }
);

window.getJsonDataUrls = function() {
    return jsonDataUrls;
  };
