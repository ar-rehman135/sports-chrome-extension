// This file is injected as a content script


import WebSocket from 'ws';

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

async function clickButtonByCssSelector() {

  const elements = document.querySelectorAll('div.b-header-content > div > div.wrapper.b-right-menu.right> :nth-child(2)> li:nth-child(2) >a[href="liv"]');
  console.log(elements)
  if (elements[0]) {
    elements[0].dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));
  } else {
    console.error('No element found with selector!');
  }
}
  
async function clickButtonByXpath() {
  
  const xpath= '//*[@id="main"]/div/div/div/a[2]';
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const element = result.singleNodeValue;
  console.log(element)
  if (element) {
    element.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));
  } else {
    console.error('No element found with selector!');
  }
}


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("listener")
  
  if (request.action === 'getHTML') {
    const html = document.documentElement.outerHTML;
    chrome.runtime.sendMessage({ action: 'sendMessage', message: html });
  }

  if (request.action === 'placeBet') {
    await placeBet();
    chrome.runtime.sendMessage({ action: 'sendMessage', message: 'Done Placebet' }); 
  }

  if (request.action === 'clickButton_byCSS') {
    await clickButtonByCssSelector();
    chrome.runtime.sendMessage({ action: 'sendMessage', message: 'Button clicked by CSS!' }); 
  }
  
  if (request.action === 'clickButton_byXpath') {
    await clickButtonByXpath();
    chrome.runtime.sendMessage({ action: 'sendMessage', message: 'Button clicked by Xpath!' }); 
  }

  // click button by css selector
  // click button by xpath
  // get html by css selector
  // get html by xpath  

});



