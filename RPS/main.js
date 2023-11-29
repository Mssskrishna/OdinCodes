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

let playerCount = 0,
    computerCount = 0;
function winnerCheck(playerSelection, computerSelection) {
    if (playerSelection == "rock") {
        switch (computerSelection) {
            case "rock":
                console.log(`match draw,${playerSelection} == ${computerSelection}`);
                break;
            case "scissors":
                console.log(
                    `player wins,${playerSelection} wins over ${computerSelection}`
                );
                playerCount++;
                break;
            case "paper":
                console.log(
                    `computer wins,${computerSelection} wins over ${playerSelection}`
                );
                computerCount++;
                break;
        }
    } else if (playerSelection == "paper") {
        switch (computerSelection) {
            case "paper":
                console.log(`match draw,${playerSelection} == ${computerSelection}`);
                break;
            case "rock":
                console.log(
                    `player wins,${playerSelection} wins over ${computerSelection}`
                );
                playerCount++;
                break;
            case "scissors":
                console.log(
                    `computer wins,${computerSelection} wins over ${playerSelection}`
                );
                computerCount++;
                break;
        }
    } else if(playerSelection=="scissors") {
        switch (computerSelection) {
            case "scissors":
                console.log(`match draw,${playerSelection} == ${computerSelection}`);
                break;
            case "paper":
                console.log(
                    `player wins,${playerSelection} wins over ${computerSelection}`
                );
                playerCount++;
                break;
            case "rock":
                console.log(
                    `computer wins,${computerSelection} wins over ${playerSelection}`
                );
                computerCount++;
                break;
        }
    }
}
let playerSelection;
let computerSelection;
while (playerCount <= 5 || computerCount <= 5) {
    playerSelection = prompt("enter your choice").toLowerCase();
    computerSelection = getComputerChoice();

    winnerCheck(playerSelection, computerSelection);
    if (playerCount == 5) {
        console.log("player wins");
        break;
    } else if (computerCount == 5) {
        console.log("computer wins");
        break;
    }
}
