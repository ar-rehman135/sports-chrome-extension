import asyncio
import json
import time

import websockets


async def echo(websocket, path):

    message = await websocket.recv()
    print(message)
    # Clicking Button by CSS selector
    await websocket.send(json.dumps({
        "action": "clickButton_byCSS",
        "payload": {}
    }))

    time.sleep(7)

    await websocket.send(json.dumps({
        "action": "clickButton_byXpath",
        "payload": {}
    }))

    time.sleep(7)

    # Getting HTMl Page
    await websocket.send(json.dumps({
        "action": "getHTML",
        "payload": {}
    }))

    # Get the HTML content from the client
    html = await websocket.recv()
    print(html)
    # Save the HTML content to a file
    with open('page.html', 'wb') as f:
        f.write(html.encode('utf-8'))

    time.sleep(10)

    # Performing bet
    await websocket.send(json.dumps({
        "action": "placeBet",
        "payload": {}
    }))




async def start_server():
    async with websockets.serve(echo, "localhost", 9000):
        print("WebSocket server started")

        await asyncio.Future()  # keep the server running


async def main():
    server_task = asyncio.create_task(start_server())
    await asyncio.gather(server_task)


if __name__ == "__main__":
    asyncio.run(main())
