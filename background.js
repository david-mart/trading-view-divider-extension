chrome.action.onClicked.addListener(async (tab) => {
  const { auto } = await chrome.storage.sync.get({ auto: false });
  if (auto) {
    const d = await chrome.storage.sync.get({ [tab.id]: false });
    const enabled = d[tab.id];

    await chrome.action.setIcon({
      path: {
        16: "icons/icon-active16.png",
        32: "icons/icon-active32.png",
        48: "icons/icon-active48.png",
        128: "icons/icon-active128.png",
      },
      tabId: tab.id,
    });
    await chrome.storage.sync.set({ [tab.id]: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["handle-multiple.js", "symbols.js", "auto.js"],
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["handle-multiple.js", "symbols.js", "manual.js"],
    });
  }
});
