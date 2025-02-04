const express = require("express");
const cors = require("cors");
const axios = require("axios");

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
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Function to check if a number is an Armstrong number
function isArmstrong(num) {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
}

// Function to get the sum of digits
function getDigitSum(num) {
    return num.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Fetch fun fact from Numbers API
async function getFunFact(num) {
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        return response.data.text;
    } catch (error) {
        return "No fun fact available for this number.";
    }
}

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;

    // Validate input
    if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
        return res.status(400).json({
            number: number,
            error: true
        });
    }

    const num = parseInt(number);
    
    // Determine number properties
    const prime = isPrime(num);
    const perfect = isPerfect(num);
    const armstrong = isArmstrong(num);
    const digitSum = getDigitSum(num);
    const parity = num % 2 === 0 ? "even" : "odd";

    // Classify properties
    let properties = [];
    if (armstrong) properties.push("armstrong");
    properties.push(parity);

    // Fetch fun fact
    const funFact = await getFunFact(num);

    // Response JSON
    res.json({
        number: num,
        is_prime: prime,
        is_perfect: perfect,
        properties: properties,
        digit_sum: digitSum,
        fun_fact: funFact
    });
});

// Define Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
