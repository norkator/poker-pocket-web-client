var CONNECTION_ID = -1;
var SOCKET_KEY = null;
var ROOM_ID = -1;
var webSocket = null;
var playerNickname = "Tester";

startWebSocket();

// Instantiate webSocket
function startWebSocket() {
  webSocket = new WebSocket("ws://pokerpocket.nitramite.com:8002");
  webSocket.onopen = function (event) {
  };
  webSocket.onmessage = function (event) {
    onMessageHandler(JSON.parse(event.data));
  };
  webSocket.onclose = function () {
  };
}

// ----------------------------------------------------

function onMessageHandler(jsonData) {
  switch (jsonData.key) {
    case 'connectionId':
      CONNECTION_ID = Number(jsonData.connectionId);
      SOCKET_KEY = jsonData.socketKey;
      console.log("My socket key: " + SOCKET_KEY);
      getRooms();
      break;
    case 'getRooms':
      ROOM_ID = 0;
      selectRoom();
      break;
    case 'getSpectateRooms':
      console.log(JSON.stringify(jsonData.data));
      break;
    case 'roomParams':
      console.log(JSON.stringify(jsonData.data));
      break;
    case 'holeCards':
      console.log(JSON.stringify(jsonData.data));
      break;
    case 'statusUpdate':
      console.log(JSON.stringify(jsonData.data));
      break;
  }
}

// ----------------------------------------------------
// To Server commands

function getRooms() {
  if (checkSocketStatus()) {
    if (ROOM_ID === -1) {
      webSocket.send(JSON.stringify({
        "connectionId": CONNECTION_ID,
        "socketKey": SOCKET_KEY,
        "key": "getRooms",
        "playerName": playerNickname,
        "roomId": ROOM_ID
      }))
    } else {
      location.reload();
    }
  }
}

function selectRoom() {
  if (checkSocketStatus()) {
    webSocket.send(JSON.stringify({
      "connectionId": CONNECTION_ID,
      "socketKey": SOCKET_KEY,
      "key": "selectRoom",
      "roomId": ROOM_ID
    }))
  }
}

function getSpectateRooms() {
  if (checkSocketStatus()) {
    if (ROOM_ID == -1) {
      webSocket.send(JSON.stringify({
        "connectionId": CONNECTION_ID,
        "socketKey": SOCKET_KEY,
        "key": "getSpectateRooms",
        "roomId": ROOM_ID
      }))
    } else {
      toastr["info"]("Spectating is only possible if room selection is not done. Refresh browser, close room list and click \"Spectate\"");
    }
  }
}

// ----------------------------------------------------

function checkSocketStatus() {
  if (webSocket.status == webSocket.OPENED) {
    return true;
  } else {
    webSocketError();
    return false;
  }
}

function webSocketError() {
  console.log("Socket communication error.");
}

// ------------------------------------------------------------------------------------
