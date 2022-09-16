import {
  birds1,
  birds2,
  birds3,
  filesPerFolder,
  birdDescriptions,
} from "./data.js";

//creates arrays to hold all of the html button/image references and player information. other variable initialization
const checkBtns = [];
const imgs = [];
const infoBtns = [];
const overlays = [];
const spacer = 90;
let birdNumber;
let bingoSpaceHolder = 0;
let pictureCounter = 1;
let playerData;
let randomIndex;
let PDBSH;
let currentBingoArray;
const winningBingoArray0 = [1, 2, 3, 4, 5];
const winningBingoArray1 = [6, 7, 8, 9, 10];
const winningBingoArray2 = [11, 12, 13, 14];
const winningBingoArray3 = [15, 16, 17, 18, 19];
const winningBingoArray4 = [20, 21, 22, 23, 24];
const winningBingoArray5 = [1, 6, 11, 15, 20];
const winningBingoArray6 = [2, 7, 12, 16, 21];
const winningBingoArray7 = [3, 8, 17, 22];
const winningBingoArray8 = [4, 9, 13, 18, 23];
const winningBingoArray9 = [5, 10, 14, 19, 24];
const winningBingoArray10 = [1, 7, 18, 24];
const winningBingoArray11 = [5, 9, 16, 20];

//assigns the references for the html button/images
for (let index = 0; index < 24; index++) {
  checkBtns[index] = document.getElementById(`checkBtn${index}`);
  imgs[index] = document.getElementById(`img${index}`);
  infoBtns[index] = document.getElementById(`infoBtn${index}`);
  overlays[index] = document.getElementById(`overlay${index}`);
}

//sets up the spacing of the bingo board and all of the css styling
let count = 0;
for (let x = 0; x < 5; x++) {
  for (let y = 0; y < 5; y++) {
    if (x == 2 && y == 2) {
    } else {
      overlays[
        count
      ].style = `z-index: 1; position: absolute; width: 80px; height: 80px; top: 50%; left: 50%; margin-top: ${
        -220 + spacer * x
      }px; margin-left: ${
        -220 + spacer * y
      }px; display: none; justify-content: center; align-items: center; font-family: cursive; font-size: 20px; background-color: rgba(0, 0, 0, 0.5);`;
      checkBtns[
        count
      ].style = `z-index: 2; position: absolute; top: 50%; left: 50%; margin-top: ${
        -220 + spacer * x
      }px; margin-left: ${-220 + spacer * y}px; display: none;`;
      document.getElementById(`infoBtn${count}`).className =
        "bg-blue-500 hover:bg-blue-700 text-white fond-bold py-0.2 px-4 rounded";
      infoBtns[
        count
      ].style = `z-index: 2; position: absolute; top: 50%; left: 50%; margin-top: ${
        -170 + spacer * x
      }px; margin-left: ${-210 + spacer * y}px; display: none;`;
      imgs[
        count
      ].style = `width: 80px; position: absolute; top: 50%; left: 50%; margin-top: ${
        -220 + spacer * x
      }px; margin-left: ${-220 + spacer * y}px; display: none;`;
      count++;
    }
  }
}

//const startGameBtn = document.getElementById("startGameBtn");

//runs when the start game button is pressed. checks to see if there is existing player/board data and sets up the general ui
startGameBtn.addEventListener("click", () => {
  modalEl.style.display = "none";
  centerX.style.display = "block";
  bingoHeader.style.display = "block";
  mainBoardDisplay.style.display = "block";
  resetBtn.style.display = "block";
  newBoardBtn.style.display = "block";
  //un-comment this out and the cooresponding code in index.html if you want players to be able to choose who they are. i don't think it is necessary
  //const player = document.getElementById("player").value;

  //loads the player data/currrent bingo array from localStorage if it exists already and parses it to javascript
  playerData = JSON.parse(localStorage.getItem("player"));
  currentBingoArray = JSON.parse(localStorage.getItem("seenBirds"));

  boardInit();

  //unhides all of the buttons/images of the bingo square
  for (let index = 0; index < 24; index++) {
    checkBtns[index].style.display = "block";
    imgs[index].style.display = "block";
    infoBtns[index].style.display = "block";
    if (currentBingoArray[index] > 0) {
      overlays[index].style.display = "flex";
    }
  }

  bingoPictureSet();
});

//starts up the event listeners for the buttons one the bingo square
for (let index = 0; index < 24; index++) {
  infoBtns[index].addEventListener("click", () => {
    //turns on the display card when the button is pressed, and makes sure the correct image is showing
    displayCard.style.display = "block";
    if (filesPerFolder[playerData[index] - 1] == 1) {
      displayCardImg.src = `img/${playerData[index]}/${playerData[index]}.jpg`;
    } else {
      displayCardImg.src = `img/${playerData[index]}/${playerData[index]}.1.jpg`;
      displayCardLeftBtn.style.display = "block";
      displayCardRightBtn.style.display = "block";
    }
    bingoSpaceHolder = index;

    //makes sure the correct bird name and description are shown on the display card
    let placeHolder = playerData[index];
    birdNumber = `bird${placeHolder}.1`;
    birdName.textContent = birdDescriptions[birdNumber].bird;
    birdDescription.textContent = birdDescriptions[birdNumber].description;
  });

  //starts up the event listeners for the check mark buttons. changes the overlay of the image when clicked
  checkBtns[index].addEventListener("click", () => {
    if (overlays[index].style.display != "none") {
      overlays[index].style.display = "none";
      currentBingoArray[index] = 0;
      localStorage.setItem("seenBirds", JSON.stringify(currentBingoArray));
    } else {
      overlays[index].style.display = "flex";
      currentBingoArray[index] = index + 1;
      localStorage.setItem("seenBirds", JSON.stringify(currentBingoArray));
      setTimeout(() => {
        checkForWin();
      }, 500);
    }
  });
}

//starts up the event listener for the seen button on the display card. changes the overlay of the image when clicked
displayCardSeenBtn.addEventListener("click", () => {
  if (overlays[bingoSpaceHolder].style.display != "none") {
    overlays[bingoSpaceHolder].style.display = "none";
    displayCard.style.display = "none";
    currentBingoArray[bingoSpaceHolder] = 0;
    localStorage.setItem("seenBirds", JSON.stringify(currentBingoArray));
  } else {
    overlays[bingoSpaceHolder].style.display = "flex";
    displayCard.style.display = "none";
    currentBingoArray[bingoSpaceHolder] = bingoSpaceHolder + 1;
    localStorage.setItem("seenBirds", JSON.stringify(currentBingoArray));
    setTimeout(() => {
      checkForWin();
    }, 500);
  }
});

//sets up an event listener for the close button of the display card. closes the display card when pressesd.
displayCardCloseBtn.addEventListener("click", () => {
  displayCard.style.display = "none";
  displayCardLeftBtn.style.display = "none";
  displayCardRightBtn.style.display = "none";
});

//sets up an event listener for when the bird on the display card has multiple images. makes it so you can cycle through the different birds toward the left.
displayCardLeftBtn.addEventListener("click", () => {
  pictureCounter--;
  PDBSH = playerData[bingoSpaceHolder];
  if (pictureCounter == 0) {
    pictureCounter = filesPerFolder[PDBSH - 1];
    displayCardImg.src = `img/${PDBSH}/${PDBSH}.${pictureCounter}.jpg`;
    birdNumber = `bird${PDBSH}.${pictureCounter}`;
    birdName.textContent = birdDescriptions[birdNumber].bird;
    birdDescription.textContent = birdDescriptions[birdNumber].description;
  } else {
    displayCardImg.src = `img/${PDBSH}/${PDBSH}.${pictureCounter}.jpg`;
    birdNumber = `bird${PDBSH}.${pictureCounter}`;
    birdName.textContent = birdDescriptions[birdNumber].bird;
    birdDescription.textContent = birdDescriptions[birdNumber].description;
  }
});

//sets up an event listener for when the bird on the display card has multiple images. makes it so you can cycle through the different birds toward the right.
displayCardRightBtn.addEventListener("click", () => {
  pictureCounter++;
  PDBSH = playerData[bingoSpaceHolder];
  if (pictureCounter > filesPerFolder[PDBSH - 1]) {
    pictureCounter = 1;
    displayCardImg.src = `img/${PDBSH}/${PDBSH}.${pictureCounter}.jpg`;
    birdNumber = `bird${PDBSH}.${pictureCounter}`;
    birdName.textContent = birdDescriptions[birdNumber].bird;
    birdDescription.textContent = birdDescriptions[birdNumber].description;
  } else {
    displayCardImg.src = `img/${PDBSH}/${PDBSH}.${pictureCounter}.jpg`;
    birdNumber = `bird${PDBSH}.${pictureCounter}`;
    birdName.textContent = birdDescriptions[birdNumber].bird;
    birdDescription.textContent = birdDescriptions[birdNumber].description;
  }
});

//unselects all of the bingo squares
resetBtn.addEventListener("click", () => {
  for (let index = 0; index < 24; index++) {
    overlays[index].style.display = "none";
    currentBingoArray = new Array(24).fill(0);
    localStorage.setItem("seenBirds", JSON.stringify(currentBingoArray));
  }
});

//brings up the "are you sure" modal to double check that they player wants a new board
newBoardBtn.addEventListener("click", () => {
  modalNewBoard.style.display = "block";
});

//hides the newBoardModal when the cancel button is pressed
newBoardCancelBtn.addEventListener("click", () => {
  modalNewBoard.style.display = "none";
});

//if the are you sure button is pressed, a new board is created and the game is reset
areYouSureBtn.addEventListener("click", () => {
  localStorage.clear();
  modalNewBoard.style.display = "none";
  playerData = null;
  boardInit();
  bingoPictureSet();
  for (let index = 0; index < 24; index++) {
    overlays[index].style.display = "none";
  }
});

//if the are you sure button is pressed, a new board is created and the game is reset
newGameBtn.addEventListener("click", () => {
  localStorage.clear();
  modalBingo.style.display = "none";
  playerData = null;
  currentBingoArray = new Array(24).fill(0);
  boardInit();
  bingoPictureSet();
  for (let index = 0; index < 24; index++) {
    overlays[index].style.display = "none";
  }
});

//assigns the images to each of the bingo squares
function bingoPictureSet() {
  imgs.forEach((img, index) => {
    if (filesPerFolder[playerData[index] - 1] == 1) {
      imgs[index].src = `img/${playerData[index]}/${playerData[index]}.jpg`;
    } else {
      index;
      imgs[index].src = `img/${playerData[index]}/${playerData[index]}.1.jpg`;
    }
  });
}

//checks if the player data is empty. if it is, values are randomly populated in
function boardInit() {
  if (playerData === null) {
    playerData = [];
    currentBingoArray = new Array(24).fill(0);
    //selects 16 birds from the birds1 array
    for (let index = 0; index < 16; index++) {
      randomIndex = Math.floor(Math.random() * birds1.length);
      let x = birds1[randomIndex];
      let loop = true;
      while (loop) {
        if (playerData.includes(x)) {
          randomIndex = Math.floor(Math.random() * birds1.length);
          x = birds1[randomIndex];
        } else loop = false;
      }
      playerData.push(x);
    }
    //selects 5 birds from the birds2 array
    for (let index = 0; index < 5; index++) {
      randomIndex = Math.floor(Math.random() * birds2.length);
      let x = birds2[randomIndex];
      let loop = true;
      while (loop) {
        if (playerData.includes(x)) {
          randomIndex = Math.floor(Math.random() * birds2.length);
          x = birds2[randomIndex];
        } else loop = false;
      }
      playerData.push(x);
    }
    //selects 3 birds from the birds3 array
    for (let index = 0; index < 3; index++) {
      randomIndex = Math.floor(Math.random() * birds3.length);
      let x = birds3[randomIndex];
      let loop = true;
      while (loop) {
        if (playerData.includes(x)) {
          randomIndex = Math.floor(Math.random() * birds3.length);
          x = birds3[randomIndex];
        } else loop = false;
      }
      playerData.push(x);
    }
    //randomizes the values of the playerData array
    let i = playerData.length,
      k,
      temp;
    while (--i > 0) {
      k = Math.floor(Math.random() * (i + 1));
      temp = playerData[k];
      playerData[k] = playerData[i];
      playerData[i] = temp;
    }

    //saves the new values of the player board and current seen birds to the webpage localStorage
    localStorage.setItem("player", JSON.stringify(playerData));
    localStorage.setItem("seenBirds", JSON.stringify(currentBingoArray));
  }
}

//function that looks at the current bingo array to see if it matches any of the winning bingo options
function checkForWin() {
  switch (true) {
    case winningBingoArray0.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray1.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray2.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray3.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray4.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray5.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray6.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray7.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray8.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray9.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray10.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    case winningBingoArray11.every((value) => {
      return currentBingoArray.includes(value);
    }):
      modalBingo.style.display = "block";
      break;
    default:
      break;
  }
}
