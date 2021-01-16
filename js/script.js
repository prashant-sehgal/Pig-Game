'use strict';

let currentScore= 0;
let activePlayer= 0;
const scores= [0, 0];
let playing = true;

const Elements = {
    player0: document.querySelector(`.player--0`),
    player1: document.querySelector(`.player--1`),
    score0: document.getElementById(`score--0`),
    score1: document.getElementById(`score--1`),
    current0: document.getElementById(`current--0`),
    current1: document.getElementById(`current--1`),
    dice: document.querySelector(`.dice`),
    rollBtn: document.querySelector(`.btn--roll`),
    newBtn: document.querySelector(`.btn--new`),
    holdBtn: document.querySelector(`.btn--hold`),
};

const init = () => {
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    for (let i= 0; i < scores.length; i++) {
        scores[i] = 0;
        Elements[`score${i}`].textContent = 0;
        Elements[`current${i}`].textContent = 0;
        Elements[`player${i}`].classList.remove(`player--winner`);
        Elements[`player${i}`].classList.remove(`player--active`);
        Elements[`player${i}`].getElementsByTagName('h2')[0].textContent = `Player ${i+1}`;
    }
    Elements.player0.classList.add(`player--active`)
} 
init();
Elements.newBtn.addEventListener('click', init);

const switchPlayer = () => {
    Elements[`current${activePlayer}`].textContent = 0;
    Elements[`player${activePlayer}`].classList.remove(`player--active`);
    activePlayer = Number(!activePlayer);
    currentScore = 0;
    Elements[`player${activePlayer}`].classList.add(`player--active`);
}

const rollDice =  () => {
    if (playing) {
        const dice= Math.trunc(Math.random() * 6) +1;

        Elements.dice.classList.contains(`hidden`)? Elements.dice.classList.remove(`hidden`): ``;
        Elements.dice.src = `img/dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            Elements[`current${activePlayer}`].textContent = currentScore;
        } else switchPlayer();
    }
}
Elements.rollBtn.addEventListener(`click`, rollDice);

const holdScore = () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        Elements[`score${activePlayer}`].textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            Elements[`player${activePlayer}`].classList.add(`player--winner`);
            Elements[`player${activePlayer}`].classList.remove(`player--active`);
            Elements[`current${activePlayer}`].textContent = 0;
            playing = false;
            Elements.dice.classList.add(`hidden`);
            Elements[`player${activePlayer}`].getElementsByTagName('h2')[0].textContent = 'Winner! 🥇🥇';
        } else switchPlayer();
    }
} 
Elements.holdBtn.addEventListener(`click`, holdScore);