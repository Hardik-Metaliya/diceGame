'use strict';
// selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const current0 = document.getElementById('current--0');
const score1EL = document.querySelector('#score--1');
const current1 = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// starting conditions
let currentscore, activePlayer, playing, scores;

const init = function () {
  current0.textContent = 0;
  current1.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  currentscore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  diceEL.classList.add('hidden');
};
init();
const swithPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //seting current score in element 0 and cs elemnt to 0 also down
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // switching player logic here
  player0EL.classList.toggle('player--active'); //toggle add or remove add if not present remove if present this changes active player makes it bright in website
  player1EL.classList.toggle('player--active');
};
// roling dice function
btnRoll.addEventListener('click', function () {
  //generate random number
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display that dice no
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    // check if 1 then reset score else add to score and swith to other player
    if (dice !== 1) {
      //add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      swithPlayer();
    }
  }
});
// hold function
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swithPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
