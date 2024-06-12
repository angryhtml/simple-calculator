let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetDisplay = false;

alert("Привет! Я simple calculator. Я легко могу посчитать любые числа до 8 значений. Я все еще учусь считать числа больше и сложнее, поэтому не обижайся, если у меня что-то получится неправильно ;)");
const displayElement = document.getElementById('display');

function clearDisplay() {
    displayValue = '';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function clearNumber() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        displayValue = '';
        shouldResetDisplay = false;
    }
    if (displayValue.length < 9) {
        displayValue += number;
        updateDisplay();
    }
}

function setOperation(operation) {
    if (currentOperation !== null) calculate();
    firstOperand = parseFloat(displayValue);
    currentOperation = operation;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperation === null || shouldResetDisplay) return;
    secondOperand = parseFloat(displayValue);
    let result;
    switch (currentOperation) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    displayValue = String(result).slice(0, 9);
    currentOperation = null;
    updateDisplay();
}

function updateDisplay() {
    displayElement.value = displayValue;
}

clearDisplay();