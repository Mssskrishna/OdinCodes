
let playerCount = 0,
    computerCount = 0,
    winner = "";

let playerSelection, computerSelection;

//these are counters for player and computer
const placount = document.querySelector("#player");
const comcount = document.querySelector("#computer");

//these are button variables for event listeners
const rockbtn = document.querySelector("#rockbtn");
const paperbtn = document.querySelector("#paperbtn");
const scissorsbtn = document.querySelector("#scissorsbtn");
const endbutton = document.querySelector(".endbutton");
//these are used to update player profile and computer profile
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
//this one used to describe who won
const winning = document.querySelector(".winning");

//this function to describe whether game is over or not
function checkwinner() {
    return (playerCount === 5 || computerCount === 5);
}

//this function is to get the computer random chioce
function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return "rock";
        case 1:
            return "scissors";
        case 2:
            return "paper";
    }
}

//this function is to check the winner
function winnerCheck(playerSelection, computerSelection) {
    if ((playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
        playerCount++;
        winner = "player";
    } else if ((computerSelection === "rock" && playerSelection === "scissors") ||
        (computerSelection === "paper" && playerSelection === "rock") ||
        (computerSelection === "scissors" && playerSelection === "paper")) {
        computerCount++;
        winner = "computer";
    } else {
        winner = "none";
    }
}

//these are event listeners added to each button
rockbtn.addEventListener("click", () => handleClick("rock"));
paperbtn.addEventListener("click", () => handleClick("paper"));
scissorsbtn.addEventListener("click", () => handleClick("scissors"));

//this function is to draw the selected choice of player and computer
function draw(playerSelection, computerSelection) {
    switch (playerSelection) {
        case "rock":
            player.textContent = "✊";
            break;
        case "paper":
            player.textContent = "✋";
            break;
        case "scissors":
            player.textContent = "✌";
            break;
    }
    switch (computerSelection) {
        case "rock":
            computer.textContent = "✊";
            break;
        case "paper":
            computer.textContent = "✋";
            break;
        case "scissors":
            computer.textContent = "✌";
            break;
    }
}

//this function is to write text for paragraphs
function writetext(winner) {
    winning.textContent = `${winner} wins`;

    placount.textContent = `Player: ${playerCount}`;
    comcount.textContent = `Computer: ${computerCount}`

}

//this function is to check the winner and update it to the ui part
function handleClick(selection) {
    if(playerCount>=5 || computerCount>=5){
        resettonormal();
    }
    playerSelection = selection;
    computerSelection = getComputerChoice();

    winnerCheck(playerSelection, computerSelection);
    draw(playerSelection, computerSelection);
    writetext(winner);
    console.log(playerCount, computerCount);

    if (checkwinner()) {
        winning.textContent = playerCount == 5 ? "player utimately wins" : "computer ultimatley wins";
        winning.classList.add('winning-ultimate')
    }
}
function resettonormal() {
    placount.textContent = `Player : 0`;
    comcount.textContent = `Computer : 0`;
    playerCount = 0;
    computerCount = 0;
    winning.textContent = "";
    winning.classList.remove("winning-ultimate");
}
endbutton.addEventListener('click', resettonormal);
