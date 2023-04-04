(chrome as any).action.onClicked.addListener((tab: any) => {
  chrome.tabs.sendMessage(tab.id, { action: 'placeBet', data: {} });
});
