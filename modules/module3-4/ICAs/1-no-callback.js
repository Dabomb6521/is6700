"use strict";

// This file uses a basic function that returns a result of adding two numbers.  No callbacks used.

// Basic function that adds two numbers and returns the result
const add = (a, b) => {

    // Add numbers
    let sum = a + b;

    // Return result to function caller
    return sum;
}


// Call the add function
let result = add(5, 10);

// Log the result to the console
// Could also do something else, like write to database,
// pass to another function, etc.
console.log("The result of the addition is: " + result);

// ************ CHALLENGE! ************ //

// 1. Re-write the add function as a function expression using ES6 arrow function syntax