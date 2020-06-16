/* Require components */
var mode = true;
var autoCheckInterval = null;
var playerNickname = "Anon" + Math.floor(Math.random() * 1000);
var room = new Room();
players = [];


// Wait for document to fully load
$(document).ready(function () {
  startApp();
});


// Start app
function startApp() {
  initSettingButtons();
  if (verifyAsyncSupport()) {
    if (enableSounds) {
      playCardOpenPackage.play();
    }
    setupSeats();
    initRoom();
    startWebSocket(mode);
    document.addEventListener('keyup', keyCommands, false);
    //debugCheck();
  }
}


// ------------------------------------------------------------------------------
/* User buttons */

function foldBtnClick() {
  if (actionButtonsEnabled) {
    setFold();
    actionButtonsEnabled = false;
  }
}

function checkBtnClick() { // Also handles Call
  if (actionButtonsEnabled) {
    for (var i = 0; i < players.length; i++) {
      if (players[i].playerId == CONNECTION_ID) {
        if (players[i].tempBet > 0) {
          toastr["info"]("You have already thrown chips in... raising...");
          setRaise(myRaiseHelper());
        } else {
          setCheck();
        }
      }
    }
    actionButtonsEnabled = false;
  }
}

function raiseBtnClick() {
  if (actionButtonsEnabled) {
    setRaise(myRaiseHelper());
    actionButtonsEnabled = false;
  }
}

function betTenClick() {
  raiseHelper(10, false);
}

function betTwentyFiveClick() {
  raiseHelper(25, false);
}

function betOneHundredClick() {
  raiseHelper(100, false);
}

function betFiveHundredClick() {
  raiseHelper(500, false);
}

function betAllInClick() {
  raiseHelper(0, true);
}

function raiseHelper(amount, allIn) {
  for (var i = 0; i < players.length; i++) {
    if (players[i].playerId == CONNECTION_ID && players[i].isPlayerTurn && Number(players[i].playerMoney) > 0) {
      if (!allIn) {
        if (players[i].playerMoney + players[i].tempBet > 0) {
          players[i].playerTotalBet = players[i].playerTotalBet + amount;
          players[i].playerMoney = players[i].playerMoney - amount;
          players[i].tempBet = players[i].tempBet + amount;
          players[i].setPlayerMoney(players[i].playerMoney);
          players[i].setPlayerTotalBet(players[i].playerTotalBet);
          if (enableSounds) {
            playCardPlaceChipsOne.play();
          }
        } else {
          toastr["error"]("Not enough money to raise!");
        }
      } else {
        players[i].playerTotalBet = players[i].playerMoney + players[i].tempBet;
        players[i].tempBet = players[i].playerMoney + players[i].tempBet;
        players[i].playerMoney = 0;
        players[i].setPlayerMoney(players[i].playerMoney);
        players[i].setPlayerTotalBet(players[i].playerTotalBet);
        if (enableSounds) {
          playCardPlaceChipsOne.play();
        }
      }
    }
  }
}

function myRaiseHelper() {
  for (var i = 0; i < players.length; i++) {
    if (players[i].playerId == CONNECTION_ID) {
      const rTempBet = players[i].tempBet;
      players[i].tempBet = 0;
      return rTempBet;
    }
  }
  return 0;
}

// ------------------------------------------------------------------------------

async function reloadDelay() {
  await sleep(500);
  location.reload(); // Reload site with new connection params
}


function forgotPasswordBtn() {
  window.location.href = 'http://www.nitramite.com/contact.html';
}

// ------------------------------------------------------------------------------

// Init's settings buttons and listeners
function initSettingButtons() {
  if (localStorage.getItem(LS_MODE_TOGGLE_STATE) !== 'null') {
    mode = localStorage.getItem(LS_MODE_TOGGLE_STATE) === 'true';
  }
  $("[name='connection-mode-toggle']").bootstrapSwitch('state', mode, true);
  if (localStorage.getItem(LS_USE_BLACK_CARDS) === null || localStorage.getItem(LS_USE_BLACK_CARDS) === 'undefined') {
    localStorage.setItem(LS_USE_BLACK_CARDS, false);
  }
  $("[name='black-cards-mode-toggle']").bootstrapSwitch('state', localStorage.getItem(LS_USE_BLACK_CARDS) === 'false', true);
  $("[name='auto-check-mode-toggle']").bootstrapSwitch('state', true, true);
  if (localStorage.getItem(LS_USE_PURPLE_TABLE) === null || localStorage.getItem(LS_USE_PURPLE_TABLE) === 'undefined') {
    localStorage.setItem(LS_USE_PURPLE_TABLE, false);
  }
  $("[name='purple-table-mode-toggle']").bootstrapSwitch('state', localStorage.getItem(LS_USE_PURPLE_TABLE) === 'false', true);
  if (!(localStorage.getItem(LS_USE_PURPLE_TABLE) === 'false')) {
    var pokerTable = document.getElementById("pokerTable");
    pokerTable.style.backgroundImage = "url('./assets/images/poker_table_purple.png')";
  }
  $('input[name="connection-mode-toggle"]').on('switchChange.bootstrapSwitch', function (event, state) {
    localStorage.setItem(LS_MODE_TOGGLE_STATE, JSON.stringify(state));
    console.log(JSON.stringify(state));
    reloadDelay();
  });
  $('input[name="black-cards-mode-toggle"]').on('switchChange.bootstrapSwitch', function (event, state) {
    localStorage.setItem(LS_USE_BLACK_CARDS, JSON.stringify(state ? false : true));
  });
  $('input[name="auto-check-mode-toggle"]').on('switchChange.bootstrapSwitch', function (event, state) {
    state ? clearInterval(autoCheckInterval) : enableAutoCheck();
  });
  $('input[name="purple-table-mode-toggle"]').on('switchChange.bootstrapSwitch', function (event, state) {
    var pokerTable = document.getElementById("pokerTable");
    if (!state) {
      pokerTable.style.backgroundImage = "url('./assets/images/poker_table_purple.png')";
      localStorage.setItem(LS_USE_PURPLE_TABLE, JSON.stringify(state ? false : true));
    } else {
      pokerTable.style.backgroundImage = "url('./assets/images/poker_table_green.png')";
      localStorage.setItem(LS_USE_PURPLE_TABLE, JSON.stringify(state ? false : true));
    }
  });
}

// ------------------------------------------------------------------------------

function enableAutoCheck() {
  autoCheckInterval = setInterval(function () {
    if (webSocket.readyState == webSocket.OPEN) {
      for (var i = 0; i < players.length; i++) {
        if (players[i].playerId == CONNECTION_ID) {
          if (players[i].isPlayerTurn && !players[i].isCallSituation) {
            checkBtnClick()
          }
        }
      }
    }
  }, 3000)
}

// Key listener for key commands
function keyCommands(e) {
  switch (e.keyCode) {
    case 67: // Check
      if (room.checkBtn.style.visibility === 'visible') {
        checkBtnClick();
      }
      break;
    case 70: // Fold
      if (room.foldBtn.style.visibility === 'visible') {
        foldBtnClick();
      }
      break;
    case 82:
      if (room.raiseBtn.style.visibility === 'visible') {
        raiseBtnClick();
      }
      break;
    case 49:
      if (room.raiseBtn.style.visibility === 'visible') {
        raiseHelper(10, false);
      }
      break;
    case 50:
      if (room.raiseBtn.style.visibility === 'visible') {
        raiseHelper(25, false);
      }
      break;
    case 51:
      if (room.raiseBtn.style.visibility === 'visible') {
        raiseHelper(100, false);
      }
      break;
    case 52:
      if (room.raiseBtn.style.visibility === 'visible') {
        raiseHelper(500, false);
      }
      break;
  }

}


// ------------------------------------------------------------------------------
