// Plays pre defined audio files,

// Base dir
let audioDir = './assets/sounds/';
let enableSounds = true;
let soundsBtn = document.getElementById('soundToggleBtn');


function toggleSounds() {
  enableSounds ? enableSounds = false : enableSounds = true;
  enableSounds ? soundsBtn.innerHTML = 'Disable sounds' : soundsBtn.innerHTML = 'Enable sounds';
  localStorage.setItem(LS_ENABLE_SOUNDS_STATE, enableSounds ? 'true' : 'false');
}

getToggleSoundsSavedState();

function getToggleSoundsSavedState() {
  if (localStorage.getItem(LS_ENABLE_SOUNDS_STATE) === 'false') {
    toggleSounds();
  }
}


let playCardOpenPackage = new Howl({
  src: [audioDir + 'open_package.wav']
});

let playCardFoldOne = new Howl({
  src: [audioDir + 'fold_one.wav']
});

let playCardPlaceChipsOne = new Howl({
  src: [audioDir + 'place_chips_one.wav']
});

let playCardChipLayOne = new Howl({
  src: [audioDir + 'chip_lay_one.wav']
});

let playChipsHandleFive = new Howl({
  src: [audioDir + 'chips_handle_five.wav']
});

let playCardSlideSix = new Howl({
  src: [audioDir + 'card_slide_six.wav']
});

let playCardTakeOutFromPackageOne = new Howl({
  src: [audioDir + 'card_take_out_from_package_one.wav']
});

let playCollectChipsToPot = new Howl({
  src: [audioDir + 'collect_chips_to_pot.wav']
});

let playCheckSound = new Howl({
  src: [audioDir + 'check_sound.ogg'],
  volume: 0.1
});
