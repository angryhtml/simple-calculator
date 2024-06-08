let currentNumber = '';
let previousNumber = '';
let operation = '';

function appendNumber(number) {
    currentNumber += number;
    document.getElementById('display').value = currentNumber;
}

function clearDisplay() {
    currentNumber = '';
    document.getElementById('display').value = currentNumber;
}

function clearNumber() {
    currentNumber = currentNumber.slice(0, -1);
    document.getElementById('display').value = currentNumber;
}