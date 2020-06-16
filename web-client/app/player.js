// Constructor
function Player(playerSeat_, playerId_, playerName_, playerMoney_) {
  this.playerSeat = playerSeat_;
  this.playerId = playerId_;
  this.playerName = playerName_;
  this.playerMoney = playerMoney_;
  this.playerTotalBet = 0;
  this.tempBet = 0;
  this.playerCards = [];
  this.isPlayerTurn = false;
  this.isFold = false;
  this.isDealer = false;
  this.isCallSituation = false;
}

Player.prototype.initPlayer = function (isMiddleOfTheGame) {
  this.playerSeat.initAnimations();
  this.setPlayerSeatVisibility();
  this.setPlayerName();
  this.setPlayerMoney();
  this.isFold = false;
  this.isDealer = false;
  this.isCallSituation = false;
  if (isMiddleOfTheGame) {
    this.setPlayerCard(0, false, isMiddleOfTheGame);
    this.setPlayerCard(1, false, isMiddleOfTheGame);
  }
};

Player.prototype.setPlayerSeatVisibility = function () {
  this.playerSeat.setSeatFrameVisibility(true);
};

Player.prototype.setPlayerName = function () {
  this.playerSeat.setName(this.playerName);
};

Player.prototype.setPlayerMoney = function (amount) {
  this.playerMoney = amount;
  this.playerSeat.setMoney(amount);
};

Player.prototype.setPlayerTotalBet = function (value) {
  this.playerTotalBet = value;
  this.playerSeat.setTotalBet(value);
  this.playerTotalBet > 0 ? this.playerSeat.setBetFrameVisibility(true) : this.playerSeat.setBetFrameVisibility(false);

};

Player.prototype.setPlayerTurn = function (isPlayerTurn, isCallSituation) {
  this.isCallSituation = isCallSituation;
  this.isPlayerTurn = isPlayerTurn;
  room.actionBtnVisibility(isPlayerTurn, false);
};

Player.prototype.setTimeBar = function (time) {
  this.playerSeat.setTimeBar(time);
};

Player.prototype.setPlayerFold = function () {
  this.isFold = true;
  this.isPlayerTurn = false;
  if (enableSounds) {
    //playCardFoldOne.play();
  }
  this.playerSeat.setTimeBar(0);
  this.playerSeat.clearCards();
};

Player.prototype.setPlayerCard = function (number, isResultsCall, gameStarted) {
  switch (number) {
    case 0:
      this.playerSeat.setCard0(this.playerCards[number], this.playerId, isResultsCall, gameStarted);
      break;
    case 1:
      this.playerSeat.setCard1(this.playerCards[number], this.playerId, isResultsCall, gameStarted);
      break;
  }
};

// Starts glow animation on seat surroundings
Player.prototype.startWinnerGlowAnimation = function () {
  this.playerSeat.seatStartWinningGlowAnimation()
};

Player.prototype.setPlayerActionText = function (actionStr) {
  this.playerSeat.setActionFrameLastAction(actionStr);
};

Player.prototype.setPlayerAsDealer = function () {
  this.isDealer = true;
  this.playerSeat.setDealerChipVisibility(true);
};

// Cards that were responsible for output result comes in as winningCards
Player.prototype.startWinnerGlowCardsAnimation = function (winningCards) {
  const l = winningCards.length;
  for (var i = 0; i < l; i++) {
    if (winningCards[i] != null || winningCards[i] != 'null') {
      switch (winningCards[i]) {
        case this.playerCards[0]:
          this.playerSeat.seatStartWinningGlowCardAnimation(0);
          break;
        case this.playerCards[1]:
          this.playerSeat.seatStartWinningGlowCardAnimation(1);
          break;
        case room.middleCards[0]:
          room.startWinnerCardGlowAnimation(0);
          break;
        case room.middleCards[1]:
          room.startWinnerCardGlowAnimation(1);
          break;
        case room.middleCards[2]:
          room.startWinnerCardGlowAnimation(2);
          break;
        case room.middleCards[3]:
          room.startWinnerCardGlowAnimation(3);
          break;
        case room.middleCards[4]:
          room.startWinnerCardGlowAnimation(4);
          break;
      }
    }
  }
};
