(function() {
  chrome.storage.sync.get("hostnameReplacerValue").then(result => {
    if ("hostnameReplacerValue" in result) {
      document.getElementById("hostname").value = result.hostnameReplacerValue;
    }
  });

  document.getElementById("submit").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const pathArray = currentTab.url.split("/");
  
      let newUrl = document.getElementById("hostname").value;
  
      if (!newUrl.startsWith("http")) {
        newUrl = pathArray[0] + "//" + newUrl;
      }
  
      if (!newUrl.endsWith("/")) {
        newUrl += "/"; 
      }
  
      newUrl += pathArray.slice(3).join("/");
  
      chrome.storage.sync.set({ hostnameReplacerValue: newUrl });
  
      chrome.tabs.update(currentTab.id, { url: newUrl });
  
      window.close();
    });
  });
})();
