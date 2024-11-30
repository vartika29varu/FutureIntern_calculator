// Select display element
const display = document.getElementById('display');

// Variables to store values
let currentInput = '';
let previousInput = '';
let operator = null;

// Handle button clicks
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    handleInput(value);
  });
});

function handleInput(value) {
  if (value === 'C') {
    // Clear the display and reset values
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
  } else if (value === '=') {
    // Perform calculation
    if (operator && previousInput) {
      currentInput = calculate();
      operator = null;
      previousInput = '';
      updateDisplay(currentInput);
    }
  } else if (['+', '-', '*', '/'].includes(value)) {
    // Set operator
    if (currentInput) {
      operator = value;
      previousInput = currentInput;
      currentInput = '';
    }
  } else {
    // Handle numbers and decimal points
    currentInput += value;
    updateDisplay(currentInput);
  }
}

function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  if (isNaN(num1) || isNaN(num2)) return '';
  switch (operator) {
    case '+': return (num1 + num2).toString();
    case '-': return (num1 - num2).toString();
    case '*': return (num1 * num2).toString();
    case '/': return num2 !== 0 ? (num1 / num2).toString() : 'Error';
    default: return '';
  }
}

function updateDisplay(value) {
  display.textContent = value;
}
