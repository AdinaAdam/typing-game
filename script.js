// ? select the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// ?lista de cuvinte pt joc -- in array 
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "music",
  "bad",
  "north",
  "dependent",
  "steer",
  "deer",
  "wool",
  "silver",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
  "contextual",
  "extraordinary",
];

let randomWord;
let score = 0;
let time = 10;

// ? set difficulty to value in local storage or medium
/*
?1. cauta in local storage cheia difficulty
?2. verifica sa vada daca este acolo
?3. daca nu are valoarea null (daca exista un obiect cu cheia difficulty) va lua obiectul
?4. daca nu gaseste nimic in local storage cu cheia dificulty - va seta valoarea medium si va salva in var difficulty
 */
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// ?fac sa apara in campul de ales dificultatea ceea ce am ales -- Set difficulty select value
// ?acelasi principiu ca difficulty -- la reload trebuie sa isi pastreze valoarea selectata
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// ?focus on text on start - la reload se selecteaza automat campul in care scriem text
text.focus();

// ?incepe numaratoarea inversa la timer --> start counting down
// ?setInterval(updateTime, 1000) - la fiecare secunda se va apela fct updateTime
const timeInterval = setInterval(updateTime, 1000);

// ?creez functia pt un cuvant random -- Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//* console.log(getRandomWord());

// ? Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//?  update score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// ? update time
function updateTime() {
  // *console.log(1);
  time--;
  timeElement.innerHTML = time + "s";

  if (time === 0) {
    // ?timerul se opreste si se goleste -- clear interval -custom js function
    clearInterval(timeInterval);

    gameOver();
  }
}

// ?Game over, show end screen
function gameOver() {
  endGameElement.innerHTML = `
    <h1>Time is up!</h1>
    <p>Your score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  // ? fac modific css in js -- fac sa apara mesajul de endGame pe ecran; in css are proprietatea display:none
  endGameElement.style.display = "flex";
}

addWordToDOM();

// ?event listener input field
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  // *console.log(insertedText);

  // ?verific daca cuv scris = cuv random --> va aparea alt cuv si se va goli campul de scriere; se va updata scorul

  if (insertedText === randomWord) {
    // ? genereaza alt cuv random
    addWordToDOM();
    updateScore();

    // ?curata campul de scriere --clear
    e.target.value = "";

    // ?setez nivelul de dificultate si adaug timp in fct de nivel
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// ?event listener on settings btn

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// ?settings select event listener

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  // *console.log(difficulty);
  // ?pun in local storage tipurile de dificultate, var dificultate
  // ? local storage - se vede in console-->application
  localStorage.setItem("difficulty", difficulty);
});
