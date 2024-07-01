const flip_button = document.querySelector("#flip-button")
const option_container = document.querySelector(".options-container")
const start_button = document.querySelector("#start-button")
const infoDisplay = document.querySelector("#info")
const turnDislay = document.querySelector("#turn")
const random_button = document.querySelector("#random-button")
let angle = 0;

document.addEventListener("keypress", (e) => {
    if (e.key == 'r') {
        rotateShips()
    }
})
function rotateShips() {
    const children = Array.from(option_container.children)
    // console.log(children)
    angle = angle === 0 ? 90 : 0;
    console.log(angle)
    children.forEach((child) => {

        child.style.transform = `rotate(${angle}deg)`
        child.style.transition = `ease-in-out 0.5s `

    })
}
//flip button
flip_button.addEventListener('click', rotateShips)
//gameboard 
const gameboard = document.querySelector("#gamesboard-container")

const width = 10;
function createBoard(player, color) {
    const gameboardContainer = document.createElement('div');
    gameboardContainer.classList.add('game-board')
    gameboardContainer.style.backgroundColor = color;
    gameboardContainer.id = player;

    for (let i = 0; i < width * width; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.id = i;
        gameboardContainer.appendChild(block)
    }

    gameboard.appendChild(gameboardContainer)


}
createBoard('player', 'beige')
createBoard('computer', 'pink')

//ship class
class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
    }
}
const destroyer = new Ship("destroyer", 2);
const submarine = new Ship("submarine", 3);
const cruiser = new Ship("cruiser", 3);
const battleship = new Ship("battleship", 4);
const carrier = new Ship("carrier", 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier]
// function getValidity()
let notDropped;

function addShip(user, ship, startId) {
    let allBoardBlocks;
    user === 'random' ? allBoardBlocks = document.querySelectorAll(`#player div`) : allBoardBlocks = document.querySelectorAll(`#${user} div`);
    const width = 10; // Assuming the width of the board is 10. Adjust accordingly.
    let isHorizontal = user === 'player' ? angle === 0 : Math.random() < 0.5;
    let randomStart = Math.floor(Math.random() * width * width);

    let startIndex = startId !== undefined ? parseInt(startId, 10) : randomStart;
    let validStart;
    if (isHorizontal) {
        validStart = (startIndex % width <= width - ship.length) ? startIndex : startIndex - (startIndex % width) + (width - ship.length);
    } else {
        validStart = (startIndex < width * (width - ship.length)) ? startIndex : startIndex - width * (ship.length - 1);
    }

    let shipBlocks = [];
    for (let i = 0; i < ship.length; i++) {
        let blockIndex;
        if (isHorizontal) {
            blockIndex = validStart + i;
        } else {
            blockIndex = validStart + i * width;
        }
        if (blockIndex < allBoardBlocks.length) {
            shipBlocks.push(allBoardBlocks[blockIndex]);
        } else {
            console.error(`Invalid block index: ${blockIndex}`);
            return; // Exit function if index is out of bounds
        }
    }

    const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));

    let valid;
    if (isHorizontal) {
        valid = shipBlocks.every((_, index) => (validStart % width + index) < width);
    } else {
        valid = shipBlocks.every((_, index) => (validStart + index * width) < width * width);
    }

    if (valid && notTaken) {
        shipBlocks.forEach(shipBlock => {
            shipBlock.classList.add(ship.name);
            shipBlock.classList.add('taken');
        });
    } else {
        if (user === 'computer' || user === 'random') {
            addShip(user, ship);
        }
        if (user === 'player') {
            notDropped = true;
        }
    }
}


ships.forEach(ship => {
    addShip('computer', ship);
});

random_button.addEventListener('click', () => {
    const playerBlocks = document.querySelectorAll("#player div")
    playerBlocks.forEach(block => {
        block.classList.remove("taken")
        block.classList.remove("destroyer")
        block.classList.remove("submarine")
        block.classList.remove("cruiser")
        block.classList.remove("carrier")
        block.classList.remove("battleship")
    })
    ships.forEach(ship => {
        addShip('random', ship)
    })
    random_button.disabled = true
    option_container.innerHTML = ''
})



//drag player ships

const optionShips = Array.from(option_container.children)

let draggedShip;

optionShips.forEach(optionShip => {
    optionShip.addEventListener("dragstart", dragStart)
})

const allPlayerBlocks = document.querySelectorAll("#player div");
// console.log(allPlayerBlocks)
allPlayerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener("dragover", dragOver)
    playerBlock.addEventListener("drop", dropShip)

    // console.log(playerBlock)
})
function dragStart(e) {
    notDropped = false;
    draggedShip = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dropShip(e) {
    // const startPlaceIndex = parseInt(e.target.id, 10);
    // console.log(e)
    e.preventDefault();
    const startIndex = e.target.id;
    console.log(startIndex)
    const ship = ships[draggedShip.id];
    addShip('player', ship, startIndex);
    if (!notDropped) {
        draggedShip.remove();
    }
}


//start game
let gameOver = false;
let playerTurn = true;
let playerHits = []
let computerHits = []
let playerSunkShips = []
let computerSunkShips = []
start_button.addEventListener("click", startGame);
function startGame(e) {
    if (option_container.children.length !== 0) {
        infoDisplay.textContent = "Please place all your pieces";


    } else {

        turnDislay.textContent = "Player Turn"
        infoDisplay.textContent = "Let's Start the Game...";

        const allBoardBlocks = document.querySelectorAll("#computer div")
        allBoardBlocks.forEach(block => block.addEventListener("click", handleClick))
    }
}

function handleClick(e) {
    if (!gameOver && playerTurn) {
        if (e.target.classList.contains('taken')) {

            e.target.classList.add("boom")
            infoDisplay.textContent = "You hit the computer ship"
            let classes = Array.from(e.target.classList)
            classes = classes.filter(className => className !== "block")

            classes = classes.filter(className => className !== "taken")
            classes = classes.filter(className => className !== "boom")
            // console.log(classes)
            playerHits.push(...classes)

            checkScore('player', playerHits, playerSunkShips)
            console.log(playerSunkShips)
        } else {
            infoDisplay.textContent = "Nothing hit this time"
            e.target.classList.add('empty')
        }
        playerTurn = false
        setTimeout(computerGo, 3000)

    }
}
function computerGo() {
    if (!gameOver) {
        turnDislay.textContent = "computer Go!"
        infoDisplay.textContent = "computer is placing its moves"

        setTimeout(() => {
            let rndGo = Math.floor(Math.random() * width * width);
            const allBoardBlocks = document.querySelectorAll("#player div")
            if (allBoardBlocks[rndGo].classList.contains('taken') && allBoardBlocks[rndGo].classList.contains('boom')) {
                computerGo()
                return
            } else if (allBoardBlocks[rndGo].classList.contains('taken') && !allBoardBlocks[rndGo].classList.contains('boom')) {
                allBoardBlocks[rndGo].classList.add('boom');
                infoDisplay.textContent = 'Computer hit your ship!!';
                let classes = Array.from(allBoardBlocks[rndGo].classList);
                classes = classes.filter(className => className !== "block")

                classes = classes.filter(className => className !== "taken")
                classes = classes.filter(className => className !== "boom")
                // console.log(classes)
                computerHits.push(...classes)

                checkScore('computer', computerHits, computerSunkShips)
                console.log(computerSunkShips)

            } else {
                allBoardBlocks[rndGo].classList.add('empty');
                infoDisplay.textContent = "Nothing hits this time"
            }
            setTimeout(() => {
                playerTurn = true
                turnDislay.textContent = "Player's turn"
                infoDisplay.textContent = "Player needs to place"
            }, 600)

        }, 300)
    }
}

function checkScore(user, userHits, userSunkShips) {
    function checkShip(shipName, shipLength) {
        if (userHits.filter(storeShip => storeShip === shipName).length === shipLength) {
            infoDisplay.textContent = `you sunk the computer ${shipName}`
            if (user === 'player') {
                playerHits = userHits.filter(storeShip => storeShip !== shipName)

            }
            if (user === 'computer') {
                computerHits = userHits.filter(storeShip => storeShip !== shipName)

            }
            userSunkShips.push(shipName)
        }
    }
    checkShip("destroyer", 2)
    checkShip("submarine", 3)
    checkShip("cruiser", 3)
    checkShip("battleship", 4)
    checkShip("carrier", 5)
    if (userSunkShips.length === 5) {
        if (user === 'player') {
            gameOver = true;
            infoDisplay.textContent = 'Player won the game'
        } else {
            gameOver = true;
            infoDisplay.textContent = 'Computer won the game'
        }
    }
}
setTimeout(() => {

    if (gameOver) {
        window.reload()
    }
},2000)