const displayCalc = document.querySelector('.display');
const allBtns = document.querySelectorAll('button');

let operator = '';
let currentValue = '';
let previousValue = '';
let exp = '';
let hasDecimal = false;

allBtns.forEach((buttons) => {
  buttons.addEventListener('click', handleClick);
});

document.addEventListener('keydown', handleKey);

function updateDisplay(value) {
  displayCalc.textContent = value;
}

function handleClick(event) {
  const button = event.target;

  if (button.classList.contains('operands')) {
    appendNumber(button.textContent);
  } else if (button.classList.contains('operators')) {
    appendOperator(button.textContent);
  } else if (button.classList.contains('clearAll')) {
    clearDisplay();
  } else if (button.classList.contains('delete')) {
    deletePreviousDigit();
  } else if (button.classList.contains('decimal')) {
    addDecimal();
  } else if (button.classList.contains('equal')) {
    performOperation();
  }
}

function handleKey(event) {
  event.preventDefault();
  const keyPress = event.key;
  if (isOperator(keyPress)) {
    appendOperator(keyPress);
  } else if (keyPress >= '0' && keyPress <= '9') {
    appendNumber(keyPress);
  } else if (keyPress === '.') {
    addDecimal();
  } else if (keyPress === '%') {
    appendOperator('%');
  } else if (keyPress === 'Escape' || keyPress === 'Delete') {
    clearDisplay();
  } else if (keyPress === 'Backspace') {
    deletePreviousDigit();
  } else if (keyPress === 'Enter') {
    performOperation();
  }
}

function isOperator(symbol) {
  if (symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
    return true;
  } else {
    return false;
  }
}

function appendNumber(operands) {
  currentValue += operands;
  exp += operands;
  updateDisplay(exp);
}

function appendOperator(op) {
  if (currentValue === '') return; //will display nothing if theres no value entered first

  if (op == '%') {
    currentValue = parseFloat(currentValue) / 100;
  } else {
    performOperation(); //this will evaluate the first the operation if another operator is entered
    operator = op;
    previousValue = currentValue;
    currentValue = '';
  }
  exp += op;
  updateDisplay(exp);
}

function performOperation() {
  if (currentValue === '' || operator === '') return; //will not display nothing if theres no value and operator entered

  let firstValue = parseFloat(previousValue);
  let secondValue = parseFloat(currentValue);
  let result = 0;

  switch (operator) {
    case '+':
      result = firstValue + secondValue;
      break;
    case '-':
      result = firstValue - secondValue;
      break;
    case 'x':
    case '*':
      result = firstValue * secondValue;
      break;
    case '÷':
    case '/':
      if (secondValue == 0) {
        updateDisplay('Error cannot be divided by 0');
        return;
      }
      result = firstValue / secondValue;
      break;
  }

  currentValue = result;
  previousValue = '';
  operator = '';
  exp = currentValue;
  hasDecimal = false;
  updateDisplay(currentValue);
}

function clearDisplay() {
  currentValue = '';
  previousValue = '';
  operator = '';
  exp = '';
  hasDecimal = false;
  updateDisplay('');
}

function deletePreviousDigit() {
  updateDisplay(displayCalc.textContent.slice(0, -1));
  exp = exp.slice(0, -1);
}

function addDecimal() {
  if (!hasDecimal) {
    currentValue += '.';
    hasDecimal = true;
  }
  updateDisplay(currentValue);
}
