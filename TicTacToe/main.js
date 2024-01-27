
let tictactoe = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
let choice = 0;

function win(check) {
    if (tictactoe[0] === check && tictactoe[1] === check && tictactoe[2] === check ||
        tictactoe[3] === check && tictactoe[4] === check && tictactoe[5] === check ||
        tictactoe[6] === check && tictactoe[7] === check && tictactoe[8] === check ||
        tictactoe[0] === check && tictactoe[3] === check && tictactoe[6] === check ||
        tictactoe[1] === check && tictactoe[4] === check && tictactoe[7] === check ||
        tictactoe[2] === check && tictactoe[5] === check && tictactoe[8] === check ||
        tictactoe[0] === check && tictactoe[4] === check && tictactoe[8] === check ||
        tictactoe[2] === check && tictactoe[4] === check && tictactoe[6] === check
    ) {
        return true;
    }
}

const userinput = document.querySelector('#uservalue');
const submitbutton = document.querySelector("button[type='submit']")
function print() {
    console.log(`${tictactoe[0]}  ${tictactoe[1]} ${tictactoe[2]}\n ${tictactoe[3]} ${tictactoe[4]} ${tictactoe[5]}\n ${tictactoe[6]} ${tictactoe[7]} ${tictactoe[8]}`)
}
function randomchoice() {
    let number = Math.round(Math.random() * 8);
    // console.log(number);
    while (tictactoe[number] !== '-') {
        number = Math.round(Math.random() * 8);
    }
    console.log(number)
    return number;
}
const formcontainer = document.querySelector(".inputbutton")
formcontainer.addEventListener('submit', (e) => {
    let userchoice;
    let computerchoice;

    e.preventDefault();
    userchoice = userinput.value;
    if (userchoice === 'X') computerchoice = 'O'
    else computerchoice = 'X'
    buttonfill(userchoice, computerchoice)
    submitbutton.disabled = true;
})

const displayblock = document.querySelector('.block');
const winner = document.querySelector('.winnerchoice')
function fillbutton(computerchoice, buttons) {
    const number = randomchoice();
    buttons[number].textContent = computerchoice;
    buttons[number].disabled = true;

    tictactoe[number] = computerchoice;
    // userchance = true;
    if (win(computerchoice)) {
        displayblock.style.cssText = "display:block";
        winner.textContent = 'computer wins';
    }
    print();
    choice++;
    // return userchance;
}
function block() {
    buttons.forEach((button) => {
        button.disabled = true;
    })
}
const buttons = document.querySelectorAll('.button');
function buttonfill(userchoice, computerchoice) {

    console.log(buttons)
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            choice++;
            button.textContent = userchoice;
            tictactoe[index] = userchoice;
            print()
            button.disabled = true;
            if (win(userchoice)) {
                displayblock.style.cssText = 'display:block';
                winner.textContent = 'user wins';
                block();
            } else if (choice < 8)
                fillbutton(computerchoice, buttons);
        })
    })

}
const restart = document.querySelector('.restart')
restart.addEventListener('click', () => {
    buttons.forEach((button) => {
        button.textContent = "";
        button.disabled = false;
        tictactoe = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
        choice = 0
        displayblock.style.cssText = "display:none"
    })
})
