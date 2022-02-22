// ToDo List

// add in keyup functionality

// ------ regex expressions ------
let expressions = {
    numeric: /[0-9]/,
    operator: /[+*\-\/]/,
    decimal: /[.]/,
    equal: /[=]/,
}

// ------ Global Variables ------
let displayValue = '0';
let num1;
let num2;
let operator;
let result;
let lastClicked = '';

// ------ DOM cache ------
let display = document.getElementById('display-container');
display.textContent = displayValue;

let numBtns = document.querySelectorAll('.number');
let operatorBtns = document.querySelectorAll('.operator');
let equalBtn = document.querySelector('.equals');
let clearBtn = document.querySelector('.clear');
let decimalBtn = document.querySelector('.decimal');
let backspaceBtn = document.querySelector('.backspace');

// ------ Event Listeners ------
numBtns.forEach(button => button.addEventListener('click', function() {

    if (displayValue === '0' || displayValue === '') {
        clearDisplay();
    }
    if (expressions['operator'].test(lastClicked)) {
        clearDisplay();
        updateLastClicked(button);
    }

    displayValue += button.textContent;
    display.textContent = displayValue;
    updateLastClicked(button);
}));

operatorBtns.forEach(button => button.addEventListener('click', function() {

    if (num1 === undefined) {
        num1 = parseFloat(displayValue);
    } 
    if (expressions['numeric'].test(parseInt(lastClicked))) {
        executeOperate();
        updateLastClicked(button);
        operator = button.textContent;
    }
    operator = button.textContent;
    updateLastClicked(button); 
}));

equalBtn.addEventListener('click', function() {
    executeOperate();
    operator = undefined;
    updateLastClicked(equalBtn.textContent);
});

clearBtn.addEventListener('click', function() {
    clearButton();
});

decimalBtn.addEventListener('click', function() {
    if (displayValue === '0') {
        displayValue += decimalBtn.textContent;
        display.textContent = displayValue;
    } else if (expressions['operator'].test(lastClicked)) {
        displayValue = `0${decimalBtn.textContent}`;
        display.textContent = displayValue;
        lastClicked = decimalBtn.textContent;
    } else if (!expressions['decimal'].test(displayValue)) {
        displayValue += decimalBtn.textContent;
        display.textContent = displayValue;
    }
});

backspaceBtn.addEventListener('click', function() {
    if (expressions['numeric'].test(lastClicked)) {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
        if (displayValue === '') {
            displayValue = '0';
            display.textContent = displayValue;
        }
    }
})

// Event Listener for keystroke functionality
document.addEventListener('keyup', function(e) {
    let key = e.key;
    // logic for if a number key was pressed
    if (expressions['numeric'].test(key)) {
        if (displayValue === '0' || displayValue === '') {
            clearDisplay();
        }
        if (expressions['operator'].test(lastClicked)) {
            clearDisplay();
            updateLastClickedKey(key);
        }
        displayValue += key;
        display.textContent = displayValue;
        updateLastClickedKey(key);
    } 
    // logic for operator keys
    if (expressions['operator'].test(key)) {
        if (num1 === undefined) {
            num1 = parseFloat(displayValue);
        } 
        if (expressions['numeric'].test(parseInt(lastClicked))) {
            executeOperate();
            updateLastClickedKey(key);
            operator = key;
        }
        operator = key;
        updateLastClickedKey(key); 
    }
    // logic for equal button or enter key
    if (expressions['equal'].test(key) || key === 'Enter') {
        executeOperate();
        operator = undefined;
        updateLastClickedKey(key);
    }
    // logic for decimal key
    if (expressions['decimal'].test(key)) {
        if (displayValue === '0') {
            displayValue += key;
            display.textContent = displayValue;
        } else if (expressions['operator'].test(lastClicked)) {
            displayValue = `0${key}`;
            display.textContent = displayValue;
            lastClicked = key;
        } else if (!expressions['decimal'].test(displayValue)) {
            displayValue += key;
            display.textContent = displayValue;
        }
    }
    // logic for backspace and delete key
    if (key === 'Backspace' || key === 'Delete') {
        if (expressions['numeric'].test(lastClicked)) {
            displayValue = displayValue.slice(0, -1);
            display.textContent = displayValue;
            if (displayValue === '') {
                displayValue = '0';
                display.textContent = displayValue;
            }
        }
    }
});

// ------ Methods -------

// adds 2 numbers together
function add(a, b) {
    let result = a + b;
    return testForDecimals(result);
}

// subtracts the 2nd number from the first
function subtract(a, b) {
    let result = a - b;
    return testForDecimals(result);
}

// multiplies 2 numbers together
function multiply(a, b) {
    let result = a * b;
    return testForDecimals(result);
}

// divides the 1st num by the 2nd -- throws an error if dividing by zero
function divide(a, b) {
    if (b === 0) {
        return 'ERROR';
    }

    let result = a / b;
    return testForDecimals(result);
}

// directs the input to the correct math function
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-': 
            return subtract(num1, num2);
        case '*': 
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function clearDisplay() {
    displayValue = '';
    display.textContent = '';
}

function updateLastClicked(button) {
    lastClicked = button.textContent;
}

function updateLastClickedKey(key) {
    lastClicked = key;
}

function executeOperate() {
    if (num1 != undefined && operator != undefined) {
        num2 = parseFloat(displayValue);

        result = operate(operator, num1, num2);
        display.textContent = result;
        if (result === 'ERROR') {
            alert(`ERROR you can't divide by 0! Press Clear to restart Calculator`);
        }
        num1 = parseFloat(result);
    }
}

function clearButton() {
    displayValue = '0';
    display.textContent = displayValue;
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
}

function testForDecimals(result) {
    if (result % 1 != 0) {
        return result.toFixed(2);
    } else {
        return result;
    }
}

// testing zone
