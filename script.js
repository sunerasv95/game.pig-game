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

let scores, activePlayer, currScore;

const initialize = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;

  if (!player0.classList.contains("player--active"))
    player0.classList.add("player--active");

  if (player1.classList.contains("player--active"))
    player1.classList.remove("player--active");

  document.querySelectorAll(".current-score").forEach(function (e) {
    e.textContent = 0;
  });

  document.querySelectorAll(".score").forEach(function (e) {
    e.textContent = 0;
  });
};

const switchPlayer = function () {
  scores[activePlayer] += currScore;

  if (scores[activePlayer] >= 100) {
    modalShow(`Player ${activePlayer === 0 ? 1 : 2} won the game!`);
    initialize();
    return;
  }

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
  currScore = 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

const modalShow = function (content) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector(".modal-content").textContent = content;
};

const modalHide = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

initialize();

//user roll the dice
btnRoll.addEventListener("click", function (e) {
  let diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.setAttribute("src", `./src/images/dice-${diceNumber}.png`);

  if (diceNumber === 1) {
    switchPlayer();
  } else {
    currScore += diceNumber;
    document.getElementById(`current--${activePlayer}`).textContent = currScore;
  }
});

//user holds scoring
holdBtn.addEventListener("click", switchPlayer);

//user reset game
resetBtn.addEventListener("click", initialize);

//modal close
modalCloseBtn.addEventListener("click", modalHide);
