chrome.runtime.sendMessage("getHbsFiles", (hbsFiles) => {
    const list = document.getElementById('fileList');
    if (hbsFiles.length === 0) {
      list.innerHTML = "<li>No .hbs files found.</li>";
    } else {
      list.innerHTML = hbsFiles.map(url => `<li>${url}</li>`).join('');
    }
  });
  chrome.runtime.sendMessage("getHbsFiles", (hbsFiles) => {
    const list = document.getElementById('fileList');

    if (hbsFiles.length === 0) {
        list.innerHTML = "<li>No .hbs files found.</li>";
    } else {
        list.innerHTML = hbsFiles.map(url => `<li><a href="#" data-url="${url}">${url}</a></li>`).join('');
    }
});

chrome.runtime.sendMessage("getHbsFiles", (data) => {
    const hbsList = document.getElementById('fileList');
    const jsonList = document.getElementById('jsonList');
  
    if (!data || !data.hbsFiles || !data.jsonDataUrls) {
      console.error("Unexpected data format received:", data);
      return;
    }
  
    // Handlebars files
    if (data.hbsFiles.length === 0) {
      hbsList.innerHTML = "<li>No .hbs files found.</li>";
    } else {
      hbsList.innerHTML = data.hbsFiles.map(url => `<li>${url}</li>`).join('');
    }
  
    // JSON data URLs
    if (data.jsonDataUrls.length === 0) {
      jsonList.innerHTML = "<li>No matching JSON data found.</li>";
    } else {
      jsonList.innerHTML = data.jsonDataUrls.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join('');
    }
  });

document.getElementById('fileList').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        const url = event.target.getAttribute('data-url');

        // Fetch the .hbs file content
        fetch(url).then(response => response.text()).then(content => {
            // Extract data paths
            const dataPaths = Array.from(new Set(content.match(/{{([^}]+)}}/g) || []));

            // Create an HTML string to display the data paths
            const dataHtml = dataPaths.length === 0 ? 'No data paths found.' : `<ul>${dataPaths.map(path => `<li>${path}</li>`).join('')}</ul>`;

            // Open a new tab with the data paths
            chrome.tabs.create({ url: "data:text/html;charset=utf-8," + encodeURIComponent(dataHtml) });

        }).catch(error => {
            console.error("Error fetching .hbs content:", error);
        });

        event.preventDefault();
    }
});
