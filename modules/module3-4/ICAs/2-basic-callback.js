"use strict";

// Node.js makes heavy use of the callback function pattern.
// A *callback function* is a regular function passed into an outer (or higher-order) function as an argument.
// When the outer function is finished with its work, it does not return the result directly.
// Instead, it calls the callback function and passes the result to it.
// This way, different callback functions can be passed in that do different things with the result.
// This is extremely useful for asynchronous JavaScript code, as we'll see in example 4.
// To illustrate the callback pattern, we'll define a function that adds two numbers and calls a "callback function" with the result.

const add = (a, b, callback) => {  // The "callback" parameter is the function that will be passed in and called when add has done its work.

    // Add numbers
    let sum = a + b;

    // Call the callback, passing in the result
    callback(sum);
}

const multi5 = (result) => {
    console.log("Multiplying result by 5.... ");
    console.log(result * 5);
}

// Now, we can call the add function and pass in different callback functions that do different things with the result.
// Let's define two different functions, one that logs the result to the console,
// and another that "fake-saves" the result to a database.

// 1. Log the result to the console

const sendResultToConsole = (result) => {
    console.log("Printing the result of add function to console...");
    console.log(result);
}

// 2. Save the result to the database

const saveResultToDatabase = (result) => {
    console.log("Saving the result of add function to database...");
    // Database code here
    console.log("Saved the value " + result + " to database!");
}


// Now, we can call the add function and log result to the console by passing in the sendResultToConsole function as the callback...
add(5, 10, sendResultToConsole);

// Or, we can call the add function and pass in the saveResultToDatabase callback function to save the result to the database.
add(7, 4, saveResultToDatabase);

add(2, 3, multi5);

add (8, 12, (result) => {
    console.log("Multiplying from an anonymous function.....");
    console.log(result * 5);
});

// Notice that, unlike the previous example, we do not capture the result of the add function in a variable.
// Instead, we pass in the callback function to process the result.

// ************ CHALLENGES! ************ //

// 1. Create another function above that multiplies a value by 5 and prints the result to the console.
//    Call the add function with two numbers and this new function as the callback.
//
// 2. In the examples above, we used *named functions* as our callback functions, and we passed the function name as the 
//    callback argument when we called the add function.  However, callback functions are often defined as *anonymous 
//    functions* right inside the call to the outer function. Instead of creating a named function and then passing this
//    name for the callback parameter as we have done above, try calling the add function again with a new callback function
//    that is defined anonymously inside the call to add.

