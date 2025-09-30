/*
A JavaScript Promise is a special object that represents the eventual completion (or failure) of an asynchronous 
operation and its resulting value. It has three possible states: pending (initial state, operation not completed), 
fulfilled (operation completed successfully), or rejected (operation failed). Promises allow handling 
asynchronous operations using .then() for success and .catch() for errors, making code more readable than 
traditional callback-based approaches. They also support chaining, enabling sequential execution of multiple 
asynchronous tasks.
*/

// Ascynchronous function that uses a promise

const addPromise = (a, b, willSucceed) => {
    // Function will return a promise that will be in one of the states described above
    return new Promise((resolve, reject) => {  // Resolve/reject are functions called to fulfill/reject the promise, respectively.
        // Simulate asynchronous operation with setTimeout
        setTimeout(() => {
            if(willSucceed) { // Force operation to succeed or fail
                let sum = a + b;
                resolve(sum); // resolve is called - promise is fulfilled
            } else {
                reject("Something went wrong"); // reject is called - promise is rejected
            }
        }, 2000);
    })
}

// call the addPromise function
addPromise(4, 5, true)
// Handle promise fulfillment with .then()
.then((result) => {
    console.log("Result of addition is :", result);
    return addPromise(result, 10, true); // Return promise and handle result in chain
})
.then((result2) => {
    console.log("Result of addition 2 is :", result2);
    return addPromise(result2, 4, true);
})
.then((result3) => {
    console.log("Result of addition 3 is :", result3);
})
// Handle promise fulfillment with .catch()
.catch((err) => {
    console.log("Ooops, an error occured: ", err);
});