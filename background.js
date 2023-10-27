let hbsFiles = [];

chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.url.endsWith('.hbs')) {
      hbsFiles.push(details.url);
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "getHbsFiles") {
    sendResponse({
        hbsFiles: hbsFiles,  // this ensures you're sending back hbsFiles array
        jsonDataUrls: getJsonDataUrls() // from jsonDetector.js
      });
  }
});
