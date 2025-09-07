"use strict";

// Most input/ouput operations in Node.js (writing/reading files, writing to/reading from a database, calling external APIs)
// are *asynchronous*, meaning that the Node runtime passes these operations off to the server operating system to handle
// asynchronously while the rest of the program continues to execute.  When the asynchronous operation is complete, the runtime 
// sends a notification to the program (using the event loop) so that the result can be processed.  This means that the result 
// of an asynchronous operation is not immediately available to the Node.js program, but must be handled at some point in the 
// future when the operation is complete.  Callback functions are particularly useful in this scenario, as they can be passed
// to asynchronous functions to handle the results of these functions whenever they are ready.

// The previous two examples used callback functions inside an outer function that adds two numbers.  Although a callback function
// can be used in this case, adding numbers is NOT an asychnronous operation in Node.js, which means that the callback pattern does
// not need to be used (the basic return pattern used in 1-no-callback.js works just fine).  However, callback functions become much
// more essential when dealing with asynchronous operations whose results are not immediately available.

// To illustrate this, we can use the Node setTimeout function.  setTimeout delays the execution of a code block until after a 
// specified number of milliseconds have elapsed.  setTimeOut is *asynchronous*, meaning that the rest of the program will continue
// to run while the code inside of the setTimeout waits for the time interval to elapse.  Because of this, we can use setTimeout
// to make normally synchronous operations (like adding numbers) asynchronous, thereby simulating other types of input/output
// operations that are inherently asynchronous.

// First, we'll define an addAsync1 function that uses setTimeout to complete the addition asynchronously, but attempts to return the
// result to the caller of the function as we saw in 1-no-callback.js

const addAsync1 = (a, b) => {
    // Wrap the addition in the setTimeout function, which is called as follows:  setTimeout(functionToExecute, millisecondsToDelay)
    setTimeout(() => {
        // Add numbers
        let sum = a + b;

        // Try to return result to function caller
        return sum;
    }, 2000) // Delay for 2000 milliseconds (2 seconds)
}

// Now, what happens if we try to call the function and get the returned result? 
// Since the add operation now runs asynchronously, the line below will actually execute BEFORE the 
// add operation is complete, and the result will be undefined.
let result = addAsync1(10, 5); // THIS WILL NOT WORK!!!!! result is undefined
console.log("The result of the addition using addAsync1 is: " + result); 

// Let's define another version of addAsync that uses a callback function to process the result instead of attempting to return it.

const addAsync2 = (a, b, callback) => {
    // Wrap addition in the setTimeout function, which is called as follows:  setTimeout(functionToExecute, millisecondsToDelay)
    setTimeout(() => {
        // Add numbers
        let sum = a + b;

        // Process the result with the callback
        callback(sum);
    }, 2000) // Delay for 2000 milliseconds (2 seconds)
}

// Now, we'll define two functions that can be called as callbacks (same as in 2-basic-callback.js)

// 1. Log the result to the console

const sendResultToConsole = (result) => {
    console.log("Printing the result of addAsync2 function to console...");
    console.log(result);
}

// 2. Save the result to the database

const saveResultToDatabase = (result) => {
    console.log("Saving the result of addAsync2 function to database...");
    // Database code here
    console.log("Saved the value " + result + " to database!");
}

// Finally, we can call addAsync2 and pass in one of the callback functions:

addAsync2(5, 10, sendResultToConsole);
addAsync2(7, 4, saveResultToDatabase);

// ************ CHALLENGES! ************ //

// 1. In addAsync1 above, try changing the delay interval of the setTimeout function from 2000 to 0, meaning 
//    the function does not wait.  Does this fix the problem with addAsync1? 

// 2. Modify addAsync2 and the callback functions to verify that a and b are numbers and use the error-first 
//    callback pattern to report an error message or print the results.