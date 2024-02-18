const SIZE = 8
const Board = Array.from({ length: SIZE }, () => new Array(SIZE).fill(0))
const moves = [[1, 2], [2, 1], [-1, -2], [-2, -1], [1, -2], [2, -1], [-1, 2], [-2, 1]];

const isValid = (x, y) => x >= 0 && x < SIZE && y >= 0 && y < SIZE;

const makeMove = (queue, x, y, dx, dy, path, count) => {
    const newX = x + dx;
    const newY = y + dy;

    if (isValid(newX, newY) && !Board[newX][newY]) {
        Board[newX][newY] = 1;
        queue.push([newX, newY, count + 1, path.concat([[newX, newY]])]);
    }
};

const queueFill = (x, y, count, path) => {
    let queue = [];
    if (isValid(x, y)) {
        Board[x][y] = 1;
    }
    for (const [dx, dy] of moves) {
        makeMove(queue, x, y, dx, dy, path, count)
    }
    return queue;
}

const solve = (start, end) => {
    const x = start[0], y = start[1];
    let queue = queueFill(x, y, 0, [[x, y]])

    while (queue.length > 0) {
        const current = queue.shift();
        const count = current[2];
        const path = current[3];
        if (current[0] === end[0] && current[1] === end[1]) {
            console.log("You found a path in moves : ", count);
            console.log(path);
            break;
        }
        const nx = current[0], ny = current[1];
        queue = queue.concat(queueFill(nx, ny, count, path))
    }
}
solve([0, 0], [3, 3])

console.table(Board)