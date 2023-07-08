"use strict";

const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const resetBtn = document.querySelector(".btn--new");
const modalCloseBtn = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let scores = [0, 0];
let activePlayer = 0;
let currScore = 0;

function modalShow(content) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector(".modal-content").textContent = content;
}

function modalHide() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function resetGame() {
  scores[0] = 0;
  scores[1] = 0;
  currScore = 0;
  activePlayer = 0;

  if (!player0.classList.contains("player--active"))
    player0.classList.add("player--active");

  player1.classList.remove("player--active");

  document.querySelectorAll(".current-score").forEach(function (e) {
    e.textContent = 0;
  });

  document.querySelectorAll(".score").forEach(function (e) {
    e.textContent = 0;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".score").textContent = 0;
});

//user roll the dice
//1. generate random dice number
//2. display dice number
//3. add dice roll to the current score
//4. display number
//5. switch the player if dice number is 1

btnRoll.addEventListener("click", function (e) {
  let diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.setAttribute("src", `./src/images/dice-${diceNumber}.png`);

  if (diceNumber === 1) {
    //update current user score
    //set current user score to 0
    //switch active user
    //toggle users

    scores[activePlayer] += currScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
    currScore = 0;

    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  } else {
    currScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent = currScore;
  }
});

//user holds scoring
holdBtn.addEventListener("click", function () {
  scores[activePlayer] += currScore;

  if (scores[activePlayer] >= 100) {
    modalShow(`Player ${activePlayer === 0 ? 1 : 2} won the game!`);
    resetGame();
    return;
  }

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
  currScore = 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
});

//user reset game
resetBtn.addEventListener("click", function () {
  resetGame();
});

//modal close
modalCloseBtn.addEventListener("click", function () {
  modalHide();
});
