// Get the display elements
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const buttons = document.querySelectorAll('button');

// Store the calculator state
let state = {
  currentOperand: '0',
  previousOperand: '',
  operation: undefined
};

// Reset the calculator
function clearAll() {
  state.currentOperand = '0';
  state.previousOperand = '';
  state.operation = undefined;
}

// Remove the last typed digit
function deleteLastDigit() {
  state.currentOperand = state.currentOperand.toString().slice(0, -1);
  if (state.currentOperand === '') {
    state.currentOperand = '0';
  }
}

// Add a number or dot to the display
function appendNumber(number) {
  if (number === '.' && state.currentOperand.includes('.')) return;

  if (state.currentOperand === '0' && number !== '.') {
    state.currentOperand = number;
  } else {
    state.currentOperand = state.currentOperand + number;
  }
}

// Save the chosen operator
function chooseOperation(operation) {
  if (state.currentOperand === '') return;

  if (state.previousOperand !== '') {
    calculate();
  }

  state.operation = operation;
  state.previousOperand = state.currentOperand;
  state.currentOperand = '';
}

// Do the calculation
function calculate() {
  const prev = parseFloat(state.previousOperand);
  const current = parseFloat(state.currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  let result;

  switch (state.operation) {
    case '+':
      result = prev + current;
      break;
    case '−':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }

  state.currentOperand = result.toString();
  state.operation = undefined;
  state.previousOperand = '';
}

// Update the screen
function updateDisplay() {
  currentOperandElement.textContent = state.currentOperand;

  if (state.operation != null) {
    previousOperandElement.textContent = `${state.previousOperand} ${state.operation}`;
  } else {
    previousOperandElement.textContent = '';
  }
}

// Add click events to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.hasAttribute('data-number')) {
      appendNumber(button.dataset.number);
    } else if (button.hasAttribute('data-operator')) {
      chooseOperation(button.dataset.operator);
    } else if (button.dataset.action === 'equals') {
      calculate();
    } else if (button.dataset.action === 'clear') {
      clearAll();
    } else if (button.dataset.action === 'delete') {
      deleteLastDigit();
    }

    updateDisplay();
  });
});

// Optional: use keyboard keys too
document.addEventListener('keydown', (event) => {
  if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
  if (event.key === '.') appendNumber('.');
  if (event.key === '+') chooseOperation('+');
  if (event.key === '-') chooseOperation('−');
  if (event.key === '*') chooseOperation('×');
  if (event.key === '/') chooseOperation('÷');
  if (event.key === 'Enter' || event.key === '=') calculate();
  if (event.key === 'Backspace') deleteLastDigit();
  if (event.key === 'Escape') clearAll();

  updateDisplay();
});
