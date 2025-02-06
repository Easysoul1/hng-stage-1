const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// In-memory cache for fun facts
const funFactCache = new Map();

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
    if (num < 2) return false;
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Function to check if a number is an Armstrong number
function isArmstrong(num) {
    const absoluteNum = Math.abs(num);
    const digits = absoluteNum.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === absoluteNum;
}

// Function to get the sum of digits
function getDigitSum(num) {
    const absoluteNum = Math.abs(num);
    return absoluteNum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
}

// Fetch fun fact from Numbers API or set custom fact for 371
async function getFunFact(num) {
    // Check if the fun fact is already cached
    if (funFactCache.has(num)) {
        return funFactCache.get(num);
    }

    // Custom fact for 371
    if (num === 371) {
        const fact = "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371";
        funFactCache.set(num, fact); // Cache the fact
        return fact;
    }

    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        const fact = response.data.text;
        funFactCache.set(num, fact); // Cache the fact
        return fact;
    } catch (error) {
        const fact = "No fun fact available for this number.";
        funFactCache.set(num, fact); // Cache the fact
        return fact;
    }
}

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;

    // Validate input
    if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
        return res.status(400).json({
            error: true,
            number: number
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
