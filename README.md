# hng-stage-1
Number Classification API
A simple Node.js + Express API that classifies numbers based on mathematical properties such as Prime, Perfect, Armstrong, Even/Odd, and calculates the sum of digits.

Features
✅ Checks if a number is Prime
✅ Checks if a number is Perfect
✅ Checks if a number is an Armstrong number
✅ Determines if a number is Even or Odd
✅ Calculates the Sum of Digits
✅ Handles invalid inputs gracefully
Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Easysoul1/hng-stage-1.git
cd hng-stage-1
2️⃣ Install Dependencies
sh
Copy code
npm install
3️⃣ Start the Server
sh
Copy code
node stage1.js
Server will run on http://localhost:3000

API Endpoints
1️⃣ Classify a Number
Endpoint:
http
Copy code
GET /api/classify-number?number={value}
Query Parameters:
Parameter	Type	Description	Example
number	Integer	The number to classify	371
Response Example:
json
Copy code
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11
}
Error Response (Invalid Input):
json
Copy code
{
    "number": "abc",
    "error": true,
    "message": "Invalid input. Please enter a valid integer."
}
How the Numbers are Classified
Prime Number
A prime number is a number greater than 1 that is only divisible by 1 and itself.
Example: 2, 3, 5, 7, 11, 13, ...

🔹 Perfect Number
A perfect number is a number where the sum of its proper divisors equals the number itself.
Example: 6 → (1 + 2 + 3 = 6)

🔹 Armstrong Number
A number where the sum of its digits raised to the power of the number of digits equals the number itself.
Example: 371 → (3³ + 7³ + 1³ = 371)
