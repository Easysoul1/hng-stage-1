const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Function to check if a number is prime
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is a perfect number
function isPerfect(num) {
    if (num < 1) return false;
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Function to check if a number is an Armstrong number
function isArmstrong(num) {
    const digits = Math.abs(num).toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === Math.abs(num);
}

// Function to get the sum of digits (handles negative numbers correctly)
function getDigitSum(num) {
    return Math.abs(num).toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Function to classify number properties
function classifyNumber(num) {
    let properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    if (isPrime(num)) properties.push("prime");
    if (isPerfect(num)) properties.push("perfect");
    properties.push(num % 2 === 0 ? "even" : "odd");

    return properties;
}

// API Endpoint
app.get("/api/classify-number", (req, res) => {
    const { number } = req.query;

    // Validate input (check if it's a valid integer)
    if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
        return res.status(400).json({
            number,
            error: true,
            message: "Invalid input. Please enter a valid integer."
        });
    }

    const num = parseInt(number);

    // Build response JSON
    res.json({
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties: classifyNumber(num),
        digit_sum: getDigitSum(num)
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
