/* WebSocket communication handler */
let CONNECTION_ID = -1;
let SOCKET_KEY = null;
let webSocket = null;
let actionButtonsEnabled = false;


startWebSocket();


// Instantiate webSocket
function startWebSocket() {
  webSocket = new WebSocket('wss://pokerpocket.nitramite.com:8001');
  // WebSocket events
  webSocket.onopen = function (event) {
  };
  webSocket.onmessage = function (event) {
    onMessageHandler(JSON.parse(event.data));
  };
  webSocket.onclose = function () {
    toastr["error"]("WebSocket closed!");
    var $noSocketConnection = $('#noSocketConnection');
    $noSocketConnection.css("height", 'auto').css("visibility", 'visible')
  };
}


// ----------------------------------------------------
// To Server commands

function getSelectedUserChartData() {
  if (checkSocketStatus()) {
    webSocket.send(JSON.stringify({
      "connectionId": CONNECTION_ID,
      "socketKey": SOCKET_KEY,
      "key": "getSelectedPlayerChartData",
      "playerId": 6,
    }))
  }
}

// ----------------------------------------------------
// From server commands a.k.a. messages
function onMessageHandler(jsonData) {
  switch (jsonData.key) {
    case 'connectionId':
      CONNECTION_ID = Number(jsonData.connectionId);
      SOCKET_KEY = jsonData.socketKey;
      console.log("My socket key: " + SOCKET_KEY);
      $('#selectRoomModal').modal('show');
      getSelectedUserChartData();
      setInterval(function () {
        console.log('Getting chart chart data');
        getSelectedUserChartData();
      }, 30 * 1000);
      break;
    case "getPlayerChartDataResult":
      getPlayerChartDataResult(jsonData.data);
      break;
  }
}


// Draw morris chart of player statistics
function getPlayerChartDataResult(cData) {
  //console.log(JSON.stringify(cData));
  // [{"money":3588,"win_count":1993,"lose_count":2572},{"money":3688,"win_count":1994,"lose_count":2572},..
  // Init chart views
  let playerMoneyChart = $('#playerMoneyChart');
  playerMoneyChart.empty();
  playerMoneyChart.css('height', 300);
  let playerWinLoseChart = $('#playerWinLoseChart');
  playerWinLoseChart.empty();
  playerWinLoseChart.css('height', 300);
  // Fetch data
  let moneyData = [];
  let winLoseData = [];
  let moneyMinVal = null, moneyMaxVal = null, winLoseMinVal = null, winLoseMaxVal = null;
  for (let i = 0; i < cData.length; i++) {
    moneyData.push({id: i, money: cData[i].money});
    winLoseData.push({id: i, win_count: cData[i].win_count, lose_count: cData[i].lose_count});
    if (i === 0) {
      moneyMinVal = cData[i].money;
      moneyMaxVal = cData[i].money;
      winLoseMinVal = cData[i].win_count;
      winLoseMaxVal = cData[i].lose_count;
    }
    moneyMinVal = (moneyMinVal > cData[i].money ? cData[i].money : moneyMinVal);
    moneyMaxVal = (moneyMaxVal < cData[i].money ? cData[i].money : moneyMaxVal);
    winLoseMinVal = (winLoseMinVal > cData[i].win_count ? cData[i].win_count : winLoseMinVal);
    winLoseMinVal = (winLoseMinVal > cData[i].lose_count ? cData[i].lose_count : winLoseMinVal);
    winLoseMaxVal = (winLoseMaxVal < cData[i].win_count ? cData[i].win_count : winLoseMaxVal);
    winLoseMaxVal = (winLoseMaxVal < cData[i].lose_count ? cData[i].lose_count : winLoseMaxVal);
  }
  if (moneyData.length > 0) {
    // Draw
    new Morris.Line({
      element: 'playerMoneyChart',
      data: moneyData,
      xkey: 'id',
      ykeys: ['money'],
      labels: ['Money'],
      resize: true,
      parseTime: false,
      ymin: moneyMinVal,
      ymax: moneyMaxVal,
    });
  }
  if (winLoseData.length > 0) {
    new Morris.Line({
      element: 'playerWinLoseChart',
      data: winLoseData,
      xkey: 'id',
      ykeys: ['win_count', 'lose_count'],
      labels: ['Wins', 'Losses'],
      resize: true,
      parseTime: false,
      ymin: winLoseMinVal,
      ymax: winLoseMaxVal,
      lineColors: ['#0b62a4', '#c10039']
    });
  }
}


function checkSocketStatus() {
  if (webSocket.status === webSocket.OPENED) {
    return true;
  } else {
    webSocketError();
    return false;
  }
}

function webSocketError() {
  toastr["error"]("Communication error! Socket state: " + webSocket.status);
}

// ------------------------------------------------------------------------------------
