"use strict";

// Sometimes, things can go wrong in the outer function before the callback is called.
// To handle this situation, callback functions in Node.js often follow the "error-first callback pattern."
// This means that callback functions are written to include an "error" parameter, which is *usually* defined as the first parameter.
// If an error in the outer function occurs, the callback will be called with some value for the error parameter (usually an error message),
// and "undefined" (or null) for other parameters.
// If no error occurs, the error parameter is passed to the callback as undefined (or null), and the other parameters are given values.

// To illustrate, suppose that we want to make sure that parameters a and b in our add function are actually numbers 
// before we attempt to add them.  If they are numbers, we will add them and pass the result to the callback function.
// If one or both are not numbers, we will pass an error message instead.

const add = (a, b, callback) => {  // The "callback" parameter is the function that will be passed in and called when add has done its work.

    // Verify that a and b are both numbers.
    // Use the isNaN JavaScript function to determine if either is Not a Number (NaN)
    if (isNaN(a) || isNaN(b)) {
        // error!  one or more of the parameters is Not a Number!
        // Call the callback function with an error message parameter and null for the result
        callback("Error! One or more values is not a number!", null);
    } else {
        // both values are numbers, so proceed with addition.
        let sum = a + b;
        // Call the callback function with null for the error message and the result in the second parameter
        callback(null, sum);

    }
}

const multi5 = (error, result) => {
    if (error){
        console.error(error);
    } else {
        console.log("Multiplying result by 5.... ");
        console.log(result * 5);
    }
}

// Now, we will modify our callback functions to include an error parameter, and we will check to see if the error exists
// before proceeding to process the results.

// 1. Log the result to the console

const sendResultToConsole = (error, value) => {
    if (error) { // If the error parameter has a value (something other than null or undefined) it will evaluate as true.
        // Display the error message
        console.log(error);
    } else { // error is null or undefined (evaluates to false)
        // Process the results
        console.log("Printing the result of add function to console...");
        console.log(value);
    }
}

// 2. Save the value to the database

const saveResultToDatabase = (error, value) => {
    if (error) { // If the error parameter has a value (something other than null or undefined) it will evaluate as true.
        console.log(error);
    } else { //error is null or undefined (evaluates to false)
        console.log("Saving the result of add function to database...");
        // Database code here
        console.log("Saved the value " + value + " to database!");
    }
}


// Now, we can test the functionality by passing valid and invalid values to the add function
add(5, 10, sendResultToConsole);
add(5, "ten", sendResultToConsole);

add(7, 4, saveResultToDatabase);
add("seven", "four", saveResultToDatabase);

add(5, 15, multi5);
add("five", 5, multi5);



// ************ CHALLENGES! ************ //

// 1. Copy the additional callback functions you created in the previous file and modify them to use the 
//    error-first callback pattern.
