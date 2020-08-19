// handle recived message:
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo == "showPageAction") {
        //retrive all open tabs:
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.pageAction.show(tabs[0].id);
        });
    }
});
