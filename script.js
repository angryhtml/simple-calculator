let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetDisplay = false;

alert(
    "Hello! I am a simple calculator.\nI can easily calculate any numbers up to 8 digits.\n" +
    "Here is how to use me:\n\n" +
    "1. To enter numbers, simply click the buttons or use the number keys on your keyboard (0-9).\n" +
    "2. To input decimal points, click the '.' button or use the period key on your keyboard.\n" +
    "3. To perform calculations, click one of the operation buttons (+, -, *, /), or use the corresponding keyboard keys.\n" +
    "4. To calculate the result, press '=' or hit 'Enter' on your keyboard.\n" +
    "5. Use 'Backspace' on your keyboard or the 'C' button to delete the last digit.\n" +
    "6. Press 'Esc' to clear the entire display.\n" +
    "7. To calculate percentages, click the '%' button or use the '%' key on your keyboard. This divides the current number by 100.\n\n" +
    "Enjoy calculating! 😊"
  );
const displayElement = document.getElementById('display');
displayElement.value = displayValue || '0';

const buttons = document.querySelectorAll('.grid-container button');

function triggerButtonAnimation(key) {
    const button = [...buttons].find(button => button.textContent === key);
    if (button) {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 100);
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
        triggerButtonAnimation(key);
    } else if (key === '.') {
        appendDecimal();
        triggerButtonAnimation(key);
    } else if (key === 'Enter') {
        calculate();
        triggerButtonAnimation('=');
    } else if (key === 'Backspace') {
        clearNumber();
        triggerButtonAnimation('Backspace');
    } else if (key === 'Escape') {
        clearDisplay();
        triggerButtonAnimation('Escape');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperation(key);
        triggerButtonAnimation(key);
    } else if (key === '%') {
        percent();
        triggerButtonAnimation('%');
    }
});

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

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
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
            if (secondOperand === 0) {
                result = 'Error';
            } else {
                result = firstOperand / secondOperand;
            }
            break;
        default:
            return;
    }
    
    displayValue = String(result).slice(0, 9);
    currentOperation = null;
    updateDisplay();
}

function percent() {
    if (firstOperand !== null && currentOperation === null) {
        displayValue = String(parseFloat(displayValue) / 100);
        updateDisplay();
    }
}

function updateDisplay() {
    displayElement.value = displayValue || '0';
}

clearDisplay();
