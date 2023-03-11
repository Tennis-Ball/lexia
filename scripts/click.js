chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "0",
    });
  });

chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "1" ? "0" : "1"

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
    });

    if (nextState == 1) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["scripts/apply.js"]
        });
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["scripts/reload.js"]
        });
    }
});
