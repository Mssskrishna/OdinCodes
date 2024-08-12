
const Gameboard = () => {
    const tictactoe = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

    const isempty = (index) => tictactoe[index] === '-';

    const fillCell = (index, choice) => {
        tictactoe[index] = choice
    }
    const getBoard = () => tictactoe;
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            tictactoe[i] = '-'
        }
    }

    const checkwin = (check) => {
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
        } else {
            return false;
        }
    }
    return { isempty, fillCell, resetBoard, checkwin, getBoard }
}

const Player = (name, value) => {
    return { name, value };
}

const Game = () => {
    const board = Gameboard();
    const playerone = Player('playerone', 'X');
    const playertwo = Player('playertwo', 'O');
    const manipulate = DomManipulation(board)
    let activePlayer = playerone;

    const getActiveplayer = () => activePlayer;

    const switchActive = () => {
        activePlayer = (activePlayer === playerone) ? playertwo : playerone;
    }
    const checkDraw = () => {
        for (let i = 0; i < 9; i++) {
            if (board.isempty(i)) {
                return false;
            }
        }
        return true;
    }
    const updateMove = (index) => {
        board.fillCell(index, getActiveplayer().value)
        if (board.checkwin(getActiveplayer().value)) {
            manipulate.displayWinner(`${getActiveplayer().name} wins`)
        } else if (checkDraw()) {
            manipulate.displayWinner('draw');
        } else
            switchActive()
    }
    const setActiveplayer = () => {
        activePlayer = playerone;
    }
    return {
        getActiveplayer, board, updateMove, setActiveplayer
    }
}

const DomManipulation = (gameboard) => {
    const winner = document.querySelector('.winnerchoice')
    const winnerblock = document.querySelector('.block')

    const buttons = document.querySelectorAll('.button')
    const head = document.querySelector('h2')
    // const game = Game()
    const game = Gameboard()
    const displayWinner = (message) => {
        winner.textContent = message;
        winnerblock.style.cssText = 'display:flex';
        blockAll(true)
    }
    const blockAll = (choice) => {
        buttons.forEach((button) => {
            button.disabled = choice;
            if (choice === false) {
                button.textContent = ''
            }
        })
    }
    const updatehead = (name) => {
        head.textContent = name
    }

    return { displayWinner, updatehead, blockAll };
}

const handleUserInput = () => {
    const buttons = document.querySelectorAll('.button')
    const setActive = Game();
    const manipulate = DomManipulation(setActive)
    const head = document.querySelector('h2')
    const replay = document.querySelector('.replay')
    manipulate.updatehead(setActive.getActiveplayer().name)

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            button.textContent = setActive.getActiveplayer().value;
            setActive.updateMove(index);

            manipulate.updatehead(setActive.getActiveplayer().name)
            button.disabled = true;
        })
    });
    replay.addEventListener('click', () => {
        setActive.board.resetBoard();
        setActive.setActiveplayer();
        buttons.forEach((button) => {
            button.textContent = '';
            button.disabled = false;
        });
        manipulate.updatehead('playerone');
        manipulate.displayWinner('');
        manipulate.blockAll(false);
    });
}
handleUserInput();
