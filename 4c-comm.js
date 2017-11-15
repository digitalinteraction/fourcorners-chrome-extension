chrome.browserAction.onClicked.addListener(function (activeTab) {
    chrome.tabs.create({ 'url': 'https://editor.fourcorners.io' }, function (tab) {
    });
});

/* chrome.runtime.onMessage.addListener(function (message) {
    if (message.message == "openPopup")
        chrome.tabs.create({ 'url': chrome.extension.getURL('popup.html') }, function (tab) {
        });
}); */