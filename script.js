// Variables
let currentInput = "0";
let previousInput = null;
let operator = null;

// Selectors
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("button");

// Function to update the display
function updateDisplay(value) {
    const maxLength = 10; // Maximum display length
    if (value.length > maxLength) {
        resultDisplay.style.fontSize = "20px"; // Reduce font size
    } else {
        resultDisplay.style.fontSize = "32px"; // Reset font size
    }
    resultDisplay.textContent = value;
}

// Clear function
function handleClear() {
    currentInput = "0";
    previousInput = null;
    operator = null;
    updateDisplay(currentInput);
}

// Backspace function
function handleBackspace() {
    currentInput = currentInput.slice(0, -1) || "0"; // Remove last character
    updateDisplay(currentInput);
}

// Handle numbers
function handleNumber(value) {
    if (currentInput === "0") {
        currentInput = value; // Replace initial "0"
    } else {
        currentInput += value; // Append the number
    }
    updateDisplay(currentInput);
}

// Handle operators
function handleOperator(value) {
    if (currentInput === "") return; // Do nothing if no input
    if (previousInput !== null) {
        calculate(); // Perform calculation if there's already a previous input
    }
    operator = value; // Set the operator
    previousInput = currentInput; // Store the current input
    currentInput = ""; // Reset the current input for the next number
}

// Perform calculations
function calculate() {
    if (previousInput === null || operator === null) return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "×":
            result = prev * curr;
            break;
        case "÷":
            result = curr === 0 ? "Error" : prev / curr; // Prevent division by 0
            break;
        default:
            return;
    }

    result = result.toString();
    if (result.length > 10) {
        result = parseFloat(result).toPrecision(10); // Truncate if too long
    }

    updateDisplay(result);
    currentInput = result;
    previousInput = null;
    operator = null;
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (value === "AC") {
            handleClear();
        } else if (value === "÷" || value === "×" || value === "+" || value === "-") {
            handleOperator(value);
        } else if (value === "=") {
            calculate();
        } else if (button.classList.contains("backspace")) {
            handleBackspace();
        }
    });
});
