
(chrome as any).action.onClicked.addListener((tab: any) => {
  setupWebSocket(tab)
});


// (chrome as any).action.onClicked.addListener((tab: any) => {
//   chrome.tabs.sendMessage(tab.id, { action: 'websocket', data: {} });
// });

async function setupWebSocket(tab: any) {
  const socket = new WebSocket('ws://localhost:9000');

  socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send('connected');
  };

  socket.onmessage = (event) => {
    console.log(`Received message from server: ${event.data}`);
    const data = JSON.parse(event.data)
    chrome.tabs.sendMessage(tab.id, { action: data.action, data: data.payload });
  };

  socket.onclose = (event) => {
    console.log(`WebSocket connection closed with code ${event.code}`);
  };

 
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendMessage') {
      console.log('Message received:', request.message);
      socket.send(request.message)
    }
  });
}

