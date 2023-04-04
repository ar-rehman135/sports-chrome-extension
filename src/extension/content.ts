// This file is injected as a content script

console.log("Hello from content script! 2");

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function placeBet() {
  const elements = document.querySelectorAll('td[data-bet="FH_HDP_h"]');
  console.log(elements)
  elements[0].dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  }));

  await delay(2000)

  const betSlips = document.querySelectorAll('div.b-bets');

  const betWin = betSlips[0].getElementsByClassName('b-bets__win')[0];

  const input = betWin.getElementsByTagName('input')[0]
  input.value = "123";

  const placeBet = document.querySelectorAll('a.place-bet')[0];
  placeBet.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  }));
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("listener")
  if (request.action === 'placeBet') {
    await placeBet();
  }
});
