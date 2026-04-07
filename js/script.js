const form = document.querySelector('form');
let formSubmitted = false;

const scoreDisplay = document.querySelectorAll('.score-display');
const gameContainer = document.querySelector('#game-container');
const gameFinished = document.querySelector('#game-finished');

const howTo = document.querySelector('#how-to');
const instructions = document.querySelector('#instructions');

let playerCount = 0;
let computerCount = 0;

const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');

const playerName = document.querySelector('#player-name')
let nameInput = '';

playerScore.innerText = playerCount;
computerScore.innerText = computerCount;


    // form //
form.addEventListener('submit', formResponse);

function formResponse(event) {
    event.preventDefault();
    
    nameInput = form.querySelector('#name-input').value;
    playerName.innerText = nameInput;
    
    form.classList.add('hide');
    for (element of scoreDisplay) element.classList.remove('hide');
    gameContainer.classList.remove('hide');

    howTo.classList.add('accordion-control');

    instructions.style.maxHeight = instructions.scrollHeight + 'px';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            instructions.style.maxHeight = '0';
        });
    });

    instructions.classList.add('accordion-panel');
    
    formSubmitted = true;
    form.reset();
}

    // accordion för instruktioner //
accBtn = howTo;
accBtn.addEventListener('click', () => {
    if(!formSubmitted) return;

    const isOpen = accBtn.classList.contains('open');

    if (isOpen) {
        instructions.style.maxHeight = instructions.scrollHeight + 'px';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                instructions.style.maxHeight = '0';
            });
        });
        accBtn.classList.remove('open');
    } else {
        instructions.style.maxHeight = instructions.scrollHeight + 'px';
        accBtn.classList.add('open');

        instructions.addEventListener('transitionend', () => {
            if (accBtn.classList.contains('open')) instructions.style.maxHeight = 'none';
        },
        { once: true });
    }
});



    // SPELET // 

const choice = ['Sten', 'Sax', 'Påse'];
const choiceImgSrc = ['./images/rock.png', './images/scissors.png', './images/paper.png'];

const computerChoiceImg = document.querySelector('.computer-choice img');
const playerOptions = document.querySelectorAll('.player-options');
const computerChoiceCaption = document.querySelector('.computer-choice figcaption');



    // anv. väljer Sten
playerOptions[0].addEventListener('click', event => {
    if (playerCount === 3 || computerCount === 3) {
        return;
    }

    let rand = Math.floor(Math.random()*3);
    computerChoiceImg.src = choiceImgSrc[rand];
    computerChoiceCaption.innerText = choice[rand].toUpperCase();

    if(rand === 2) {
        computerCount++;
    } else if(rand === 1) {
        playerCount++;
    }

    playerScore.innerText = playerCount;
    computerScore.innerText = computerCount;

    winCheck();
});

    // anv. väljer Sax
playerOptions[1].addEventListener('click', event => {
    if (playerCount === 3 || computerCount === 3) {
        return;
    }

    let rand = Math.floor(Math.random()*3);
    computerChoiceImg.src = choiceImgSrc[rand];
    computerChoiceCaption.innerText = choice[rand].toUpperCase();

    if(rand === 0) {
        computerCount++;
    } else if(rand === 2) {
        playerCount++;
    }

    playerScore.innerText = playerCount;
    computerScore.innerText = computerCount;
    
    winCheck();
});

    // anv. väljer Påse
playerOptions[2].addEventListener('click', event => {
    if (playerCount === 3 || computerCount === 3) {
        return;
    }

    let rand = Math.floor(Math.random()*3);
    computerChoiceImg.src = choiceImgSrc[rand];
    computerChoiceCaption.innerText = choice[rand].toUpperCase();

    if(rand === 1) {
        computerCount++;
    } else if(rand === 0) {
        playerCount++;
    }

    playerScore.innerText = playerCount;
    computerScore.innerText = computerCount;

    winCheck();
});



    // VINST/SPELET SLUTAR //

function winCheck() {
    if (playerCount === 3 || computerCount === 3) {
        gameFinished.classList.remove('hide');
    }
    if (playerCount === 3) {
        playerWins();
    } else if (computerCount === 3) {
        computerWins();
    }
}

function playerWins() {
    scoreDisplay[2].classList.add('player-wins');
    playerWins = document.createElement('h2');
    playerWins.innerText =
    `${nameInput} vann spelet med ${playerCount} poäng mot ${computerCount}!`;
    gameFinished.prepend(playerWins);
}

function computerWins() {
    scoreDisplay[2].classList.add('computer-wins');
    computerWins = document.createElement('h2');
    computerWins.innerText =
    `Datorn vann spelet med ${computerCount} poäng mot ${playerCount}!`
    gameFinished.prepend(computerWins);
}

const reloadBtn = document.querySelector('#restart');
reloadBtn.addEventListener('click', event => {
    location.reload();
});