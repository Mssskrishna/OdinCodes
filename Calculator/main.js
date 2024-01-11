const cont = document.querySelector(".container");

const p = document.querySelector(".para");
let count = 0;
const array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '0', '-', '*', '/', '%', 'c', '=', '<X'];
const blockContainers = document.querySelector('.block')

for (let i = 0; i < array.length; i++) {
    const butto = document.createElement('button');
    butto.textContent = array[i];
    butto.style.cssText = "width:7vw;";

    butto.addEventListener("click", () => {
        if (array[i] === '=') {
            if (evaluateExpression(p.textContent) != NaN) p.textContent = evaluateExpression(p.textContent);
        } else if (array[i] === 'c') {
            p.textContent = '';
        } else if (array[i] === '<X') {
            p.textContent = p.textContent.slice(0, -1);
        } else {
            p.textContent += butto.textContent;
        }
    });

    blockContainers.appendChild(butto);
}

function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/', '%'];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 3 };

    const performOperation = (operand1, operand2, operator) => {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
            case '%':
                return operand1 % operand2;
            default:
                return NaN;
        }
    };

    const stack = [];
    const operatorStack = [];

    const tokens = expression.match(/\d+|\+|\-|\*|\/|%/g);
    console.log(tokens);

    tokens.forEach(token => {
        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token));
        } else if (operators.includes(token)) {
            while (
                operatorStack.length > 0 &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                const operator = operatorStack.pop();
                const operand2 = stack.pop();
                const operand1 = stack.pop();
                const result = performOperation(operand1, operand2, operator);
                stack.push(result);
            }
            operatorStack.push(token);
        }
    });

    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        const result = performOperation(operand1, operand2, operator);
        stack.push(result);
    }

    return stack[0];
}

