// Variables
var imgFolder = './assets/images/';
var seats = [];


// ------------------------------------------------------------------------------
/* Room in general related */
function Room() {
  this.roomName = document.getElementById('roomName');
  this.spectatorsCount = document.getElementById('spectatorsCount');
  this.waitingPlayersCount = document.getElementById('waitingPlayersCount');
  this.deckStatus = document.getElementById('deckStatus');
  this.deckCardsBurned = document.getElementById('deckCardsBurned');
  this.middleCards = [];
  this.roomStatusText = document.getElementById('roomStatusText');
  this.middleCard0 = document.getElementById('mC0');
  this.middleCard1 = document.getElementById('mC1');
  this.middleCard2 = document.getElementById('mC2');
  this.middleCard3 = document.getElementById('mC3');
  this.middleCard4 = document.getElementById('mC4');
  this.totalPot = document.getElementById('totalPot');
  this.minBet = document.getElementById('minBet');
  this.foldBtn = document.getElementById('foldBtn');
  this.checkBtn = document.getElementById('checkBtn');
  this.raiseBtn = document.getElementById('raiseBtn');
}

function initRoom() {
  room.middleCards = [];
  room.clearMiddleCards();
  room.setTotalPot(0);
  room.setMinBet(0);
  room.actionBtnVisibility(false, true);
  room.middleCard0.classList.remove('magictime');
  room.middleCard0.classList.remove('puffIn');
  room.middleCard0.style.animation = '';
  room.middleCard1.classList.remove('magictime');
  room.middleCard1.classList.remove('puffIn');
  room.middleCard1.style.animation = '';
  room.middleCard2.classList.remove('magictime');
  room.middleCard2.classList.remove('puffIn');
  room.middleCard2.style.animation = '';
  room.middleCard3.classList.remove('magictime');
  room.middleCard3.classList.remove('puffIn');
  room.middleCard3.style.animation = '';
  room.middleCard4.classList.remove('magictime');
  room.middleCard4.classList.remove('puffIn');
  room.middleCard4.style.animation = '';
}

Room.prototype.setRoomStatusText = function (statusStr) {
  this.roomStatusText.innerHTML = "Current status: " + statusStr;
};

Room.prototype.setRoomName = function (roomNameStr) {
  this.roomName.innerHTML = "♦ " + roomNameStr;
};

Room.prototype.setRoomSpectatorCount = function (spectatorCount) {
  this.spectatorsCount.innerHTML = "♦ Spectating: " + spectatorCount;
};

Room.prototype.setRoomWaitingPlayersCount = function (waitingPlayersCount) {
  this.waitingPlayersCount.innerHTML = "♦ Waiting: " + waitingPlayersCount;
};

Room.prototype.setRoomDeckStatus = function (deckStatus) {
  this.deckStatus.innerHTML = "♦ Deck: " + deckStatus;
};

Room.prototype.setRoomDeckBurnedCount = function (burnedCards) {
  this.deckCardsBurned.innerHTML = "♦ Burned: " + burnedCards;
};

Room.prototype.setTotalPot = function (money) {
  if (money > 0) {
    this.totalPot.style.visibility = 'visible';
    this.totalPot.innerHTML = Number(money).currencyFormat(2, '.', ',') + '$';
  } else {
    this.totalPot.style.visibility = 'hidden';
  }
};

Room.prototype.setMinBet = function (money) {
  if (money > 0) {
    this.minBet.style.visibility = 'visible';
    this.minBet.innerHTML = 'MB ' + Number(money).currencyFormat(2, '.', ',') + '$';
  } else {
    this.minBet.style.visibility = 'hidden';
  }
};

// When calling situation occurs, swap check btn text to call (handled by statusUpdate call from server)
Room.prototype.toggleCheckAndCall = function (isCallSituation) {
  isCallSituation ? this.checkBtn.innerHTML = 'Call' : this.checkBtn.innerHTML = 'Check';
};

Room.prototype.actionBtnVisibility = function (visible, isInit) {
  if (visible) {
    if (this.foldBtn.style.visibility !== 'visible' && !isInit) {
      if (enableSounds) {
        playCardTakeOutFromPackageOne.play();
      }
    }
    this.foldBtn.style.visibility = 'visible';
    this.checkBtn.style.visibility = 'visible';
    this.raiseBtn.style.visibility = 'visible';
  } else {
    if (this.foldBtn.style.visibility !== 'hidden' && !isInit) {
      if (enableSounds) {
        playCardTakeOutFromPackageOne.play();
      }
    }
    this.foldBtn.style.visibility = 'hidden';
    this.checkBtn.style.visibility = 'hidden';
    this.raiseBtn.style.visibility = 'hidden';
  }
};

Room.prototype.clearMiddleCards = function () {
  this.middleCard0.style.backgroundImage = 'url()';
  this.middleCard1.style.backgroundImage = 'url()';
  this.middleCard2.style.backgroundImage = 'url()';
  this.middleCard3.style.backgroundImage = 'url()';
  this.middleCard4.style.backgroundImage = 'url()';
};

Room.prototype.setMiddleCard = function (number, isMiddleOfTheGame) {
  if (enableSounds && !isMiddleOfTheGame) {
    playCardSlideSix.play();
  }
  switch (number) {
    case 0:
      this.setMiddleCard0(this.middleCards[number]);
      break;
    case 1:
      this.setMiddleCard1(this.middleCards[number]);
      break;
    case 2:
      this.setMiddleCard2(this.middleCards[number]);
      break;
    case 3:
      this.setMiddleCard3(this.middleCards[number]);
      break;
    case 4:
      this.setMiddleCard4(this.middleCards[number]);
      break;
  }
};

Room.prototype.setMiddleCard0 = function (cardStr) {
  this.middleCard0.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  this.middleCard0.classList.toggle('magictime');
  this.middleCard0.classList.toggle('puffIn');
};

Room.prototype.setMiddleCard1 = function (cardStr) {
  this.middleCard1.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  this.middleCard1.classList.toggle('magictime');
  this.middleCard1.classList.toggle('puffIn');
};

Room.prototype.setMiddleCard2 = function (cardStr) {
  this.middleCard2.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  this.middleCard2.classList.toggle('magictime');
  this.middleCard2.classList.toggle('puffIn');
};

Room.prototype.setMiddleCard3 = function (cardStr) {
  this.middleCard3.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  this.middleCard3.classList.toggle('magictime');
  this.middleCard3.classList.toggle('puffIn');
};

Room.prototype.setMiddleCard4 = function (cardStr) {
  this.middleCard4.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  this.middleCard4.classList.toggle('magictime');
  this.middleCard4.classList.toggle('puffIn');
};

Room.prototype.startWinnerCardGlowAnimation = function (cardNumber) {
  switch (cardNumber) {
    case 0:
      this.middleCard0.style.animation = 'slideUp 1.0s infinite alternate';
      break;
    case 1:
      this.middleCard1.style.animation = 'slideUp 1.0s infinite alternate';
      break;
    case 2:
      this.middleCard2.style.animation = 'slideUp 1.0s infinite alternate';
      break;
    case 3:
      this.middleCard3.style.animation = 'slideUp 1.0s infinite alternate';
      break;
    case 4:
      this.middleCard4.style.animation = 'slideUp 1.0s infinite alternate';
      break;
  }
};

// ------------------------------------------------------------------------------
/* Seat related */

function setupSeats() {
  seats.push(new Seat('s1SeatFrame', 's1c0', 's1c1', 's1CardView', 's1Name', 's1Money', 's1TimeBar', 's1BetFrame', 's1TotalBet', 's1ActionFrame', 's1LastActionText', 's1DealerChip')); // 1
  seats.push(new Seat('s2SeatFrame', 's2c0', 's2c1', 's2CardView', 's2Name', 's2Money', 's2TimeBar', 's2BetFrame', 's2TotalBet', 's2ActionFrame', 's2LastActionText', 's2DealerChip')); // 2
  seats.push(new Seat('s3SeatFrame', 's3c0', 's3c1', 's3CardView', 's3Name', 's3Money', 's3TimeBar', 's3BetFrame', 's3TotalBet', 's3ActionFrame', 's3LastActionText', 's3DealerChip')); // 3
  seats.push(new Seat('s4SeatFrame', 's4c0', 's4c1', 's4CardView', 's4Name', 's4Money', 's4TimeBar', 's4BetFrame', 's4TotalBet', 's4ActionFrame', 's4LastActionText', 's4DealerChip')); // 4
  seats.push(new Seat('s5SeatFrame', 's5c0', 's5c1', 's5CardView', 's5Name', 's5Money', 's5TimeBar', 's5BetFrame', 's5TotalBet', 's5ActionFrame', 's5LastActionText', 's5DealerChip')); // 5
  seats.push(new Seat('s6SeatFrame', 's6c0', 's6c1', 's6CardView', 's6Name', 's6Money', 's6TimeBar', 's6BetFrame', 's6TotalBet', 's6ActionFrame', 's6LastActionText', 's6DealerChip')); // 6
  initSeats();
}

function initSeats() {
  for (var i = 0; i < seats.length; i++) {
    seats[i].initSeat();
  }
}

// Constructor
function Seat(seatFrame, elemCard0, elemCard1, elemCardView, elemName, elemMoney, elemTimeBar, elemBetFrame, elemTotalBet, elemActionFrame, elemLastActionText, elemDealerChip) {
  this.seatFrame = document.getElementById(seatFrame);
  this.seatCard0 = document.getElementById(elemCard0);
  this.seatCard1 = document.getElementById(elemCard1);
  this.seatCardView = document.getElementById(elemCardView);
  this.seatName = document.getElementById(elemName);
  this.seatMoney = document.getElementById(elemMoney);
  this.seatTimeBar = document.getElementById(elemTimeBar);
  this.seatBetFrame = document.getElementById(elemBetFrame);
  this.seatTotalBet = document.getElementById(elemTotalBet);
  this.seatActionFrame = document.getElementById(elemActionFrame);
  this.seatLastActionText = document.getElementById(elemLastActionText);
  this.seatDealerChip = document.getElementById(elemDealerChip);
}

Seat.prototype.initSeat = function () {
  this.setSeatFrameVisibility(false);
  this.setName("-");
  this.setMoney(0);
  this.setTimeBar(0);
  this.setBetFrameVisibility(false);
  this.setTotalBet(0);
  this.clearCards();
  this.setActionFrameVisibility(false);
  this.setDealerChipVisibility(false);
};

Seat.prototype.initAnimations = function () {
  this.seatCard0.classList.remove('magictime');
  this.seatCard0.classList.remove('puffIn');
  this.seatCard1.classList.remove('magictime');
  this.seatCard1.classList.remove('puffIn');
  this.seatCard0.style.animation = '';
  this.seatCard1.style.animation = '';
  this.seatCardView.style.animation = '';
  this.seatBetFrame.classList.remove('magictime');
  this.seatBetFrame.classList.remove('puffIn');
};

Seat.prototype.setSeatFrameVisibility = function (bool) {
  bool ? this.seatFrame.style.visibility = 'visible' : this.seatFrame.style.visibility = 'hidden'
};

Seat.prototype.clearCards = function () {
  this.seatCard0.style.backgroundImage = 'url()';
  this.seatCard1.style.backgroundImage = 'url()';
};

Seat.prototype.setCard0 = function (cardStr, playerId, isResultsCall, isMiddleOfTheGame) {
  if (enableSounds && !isMiddleOfTheGame) {
    playCardSlideSix.play();
  }
  if (playerId == CONNECTION_ID || isResultsCall) {
    this.seatCard0.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  } else {
    this.seatCard0.style.backgroundImage = 'url(' + imgFolder + 'card_top_red.png' + ')';
  }
  this.seatCard0.classList.toggle('magictime');
  this.seatCard0.classList.toggle('puffIn');
};

Seat.prototype.setCard1 = function (cardStr, playerId, isResultsCall, isMiddleOfTheGame) {
  if (enableSounds && !isMiddleOfTheGame) {
    playCardSlideSix.play();
  }
  if (playerId == CONNECTION_ID || isResultsCall) {
    this.seatCard1.style.backgroundImage = 'url(' + getCardResource(cardStr) + ')';
  } else {
    this.seatCard1.style.backgroundImage = 'url(' + imgFolder + 'card_top_red.png' + ')';
  }
  this.seatCard1.classList.toggle('magictime');
  this.seatCard1.classList.toggle('puffIn');
};

Seat.prototype.setName = function (name) {
  this.seatName.innerHTML = name;
};

Seat.prototype.setMoney = function (money) {
  this.seatMoney.innerHTML = Number(money).currencyFormat(2, '.', ',') + '$';
};

Seat.prototype.setTimeBar = function (progress) {
  this.seatTimeBar.style = 'width:' + progress + '%';
};

Seat.prototype.setBetFrameVisibility = function (bool) {
  bool ? this.seatBetFrame.style.visibility = 'visible' : this.seatBetFrame.style.visibility = 'hidden'
};

Seat.prototype.setTotalBet = function (value) {
  var previousValue = Number(this.seatTotalBet.innerHTML);
  if (value != previousValue && value != 0 && value != void 0) {
    // toastr["info"]("{ value change: " + value + " }");
    this.seatBetFrame.classList.toggle('magictime');
    this.seatBetFrame.classList.toggle('puffIn');
  }
  this.seatTotalBet.innerHTML = value;
};

Seat.prototype.seatStartWinningGlowAnimation = function () {
  this.seatCardView.style.animation = 'winnerPulse 0.5s infinite alternate';
};

Seat.prototype.seatStartWinningGlowCardAnimation = function (cardNumber) {
  cardNumber == 0 ? this.seatCard0.style.animation = 'slideUp 1.0s infinite alternate' :
    this.seatCard1.style.animation = 'slideUp 1.0s infinite alternate';
};

Seat.prototype.setActionFrameVisibility = function (bool) {
  bool ? this.seatActionFrame.style.visibility = 'visible' : this.seatActionFrame.style.visibility = 'hidden';
};

Seat.prototype.setActionFrameLastAction = function (actionStr) {
  var _this = this;
  this.setActionFrameVisibility(true);
  this.seatActionFrame.innerHTML = ''; // clean inner element's
  var textDiv = document.createElement('div'); // Create new div element
  textDiv.className = 'lastActionTexts magicTimeAction puffIn';
  textDiv.innerHTML = actionStr;
  this.seatActionFrame.appendChild(textDiv);
  hideLastActionAsync();

  async function hideLastActionAsync() {
    await sleep(1000);
    _this.setActionFrameVisibility(false);
  }
};

Seat.prototype.setDealerChipVisibility = function (bool) {
  bool ? this.seatDealerChip.style.visibility = 'visible' : this.seatDealerChip.style.visibility = 'hidden';
};


Seat.prototype.seatCollectChipsToPot = function () {
  var _this = this;
  this.seatBetFrame.style.animation = this.seatBetFrame.getAttribute('id').substring(0, 2) + 'ChipsToPot 0.5s alternate';
  console.log('collect pot full animation name was: ' + this.seatBetFrame.getAttribute('id').substring(0, 2) + 'ChipsToPot 0.5s alternate');
  setTimeout(function () {
    _this.seatBetFrame.style.animation = '';
    _this.setBetFrameVisibility(false);
  }, 500)
};


// ------------------------------------------------------------------------------

Number.prototype.currencyFormat = function (c, d, t) {
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

// ------------------------------------------------------------------------------

function getCardResource(cardStr) {
  var styleStr = '';
  if (localStorage.getItem(LS_USE_BLACK_CARDS) != null) {
    styleStr = localStorage.getItem(LS_USE_BLACK_CARDS) === 'true' ? '_black' : ''
  }
  var suit = getSuit(cardStr);
  var value = getValue(cardStr);
  if (suit === undefined || suit === '' || value === undefined || value === '') {
    return '';
  } else {
    return imgFolder + 'card_' + suit + "_" + value + styleStr + '.png';
  }
}

function getSuit(cardStr) {
  if (cardStr !== void 0) {
    if (cardStr.indexOf('♠') !== -1) { // Spades
      return 'spades'
    } else if (cardStr.indexOf('♥') !== -1) { // Hearts
      return "hearts";
    } else if (cardStr.indexOf('♣') !== -1) { // Clubs
      return "clubs";
    } else if (cardStr.indexOf('♦') !== -1) { // Diamonds
      return "diamonds";
    } else {
      return '';
    }
  } else {
    return '';
  }
}

function getValue(cardStr) {
  if (cardStr !== void 0) {
    if (cardStr.indexOf("2") !== -1) {
      return "two";
    } else if (cardStr.indexOf("3") !== -1) {
      return "three";
    } else if (cardStr.indexOf("4") !== -1) {
      return "four";
    } else if (cardStr.indexOf("5") !== -1) {
      return "five";
    } else if (cardStr.indexOf("6") !== -1) {
      return "six";
    } else if (cardStr.indexOf("7") !== -1) {
      return "seven";
    } else if (cardStr.indexOf("8") !== -1) {
      return "eight";
    } else if (cardStr.indexOf("9") !== -1) {
      return "nine";
    } else if (cardStr.indexOf("10") !== -1) {
      return "ten";
    } else if (cardStr.indexOf("J") !== -1) {
      return "eleven";
    } else if (cardStr.indexOf("Q") !== -1) {
      return "twelve";
    } else if (cardStr.indexOf("K") !== -1) {
      return "thirteen";
    } else if (cardStr.indexOf("A") !== -1) {
      return "fourteen";
    } else {
      return '';
    }
  } else {
    return '';
  }
}

// ------------------------------------------------------------------------------
