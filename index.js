// ToDo List
// 4) Create the eventlistener functions that populate the dislay when you click the number buttons
//   -- Hint: you should be storing the 'display value' in a variable somewhere for use in the next step
// 5) Make the calc work!
//   -- store the first number 


// DOM cache

// Methods

// adds 2 numbers together
function add(a, b) {
    return a + b;
}

// subtracts the 2nd number from the first
function subtract(a, b) {
    return a - b;
}

// multiplies 2 numbers together
function multiply(a, b) {
    return a * b;
}

// divides the 1st num by the 2nd -- throws an error if dividing by zero
function divide(a, b) {
    if (b === 0) {
        console.log(`You can't divide by zero`);
        return;
    }
    return a / b;
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



// testing zone
console.log(operate('*', 25, 55));