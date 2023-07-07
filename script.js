"use strict";

const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const resetBtn = document.querySelector(".btn--new");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const scorePlayer0 = document.getElementById("score--0");
const scorePlayer1 = document.getElementById("score--1");
const currScorePlayer0 = document.getElementById("current--0");
const currScorePlayer1 = document.getElementById("current--1");

let scores = [0, 0];
let activePlayer = 0;
let currScore = 0;

document.addEventListener("DOMContentLoaded", function () {
  scorePlayer0.textContent = scores[0];
  scorePlayer1.textContent = scores[1];
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
    console.log("number 1");

    //update current user score
    //set current user score to 0
    //switch active user
    //toggle users

    if (activePlayer === 1) {
      scores[1] += currScore;
      scorePlayer1.textContent = scores[1];
      currScorePlayer1.textContent = 0;
      activePlayer = 0;
    } else {
      scores[0] += currScore;
      scorePlayer0.textContent = scores[0];
      currScorePlayer0.textContent = 0;
      activePlayer = 1;
    }

    currScore = 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
  } else {
    currScore += diceNumber;
    activePlayer === 1
      ? (currScorePlayer1.textContent = currScore)
      : (currScorePlayer0.textContent = currScore);
  }
});

//user holds scoring
holdBtn.addEventListener("click", function () {
  if (activePlayer === 1) {
    scores[1] += currScore;
    scorePlayer1.textContent = scores[1];
    currScorePlayer1.textContent = 0;
    activePlayer = 0;
  } else {
    scores[0] += currScore;
    scorePlayer0.textContent = scores[0];
    currScorePlayer0.textContent = 0;
    activePlayer = 1;
  }

  currScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
});

//user reset game
resetBtn.addEventListener("click", function () {
  currScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;

  if (!player0.classList.contains("player--active"))
    player0.classList.add("player--active");
  player1.classList.remove("player--active");
  scorePlayer0.textContent = scores[0];
  scorePlayer1.textContent = scores[1];
  currScorePlayer0.textContent = 0;
  currScorePlayer1.textContent = 0;
});
