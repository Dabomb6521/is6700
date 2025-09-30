// Asynchronous function that uses a callback as a parameter
// Uses the error-first callback pattern
// The willSucceed parameter is used to force the function to simulate success or failure of an asynchronous operation

const addCallback = (a, b, willSucceed, callback) => {
    // Simulate an asychronous operation (such as a database query)
    setTimeout(() => {
        //check to see if function should succeed
        if (willSucceed) {
            let sum = a + b;
            callback(null, sum);
        } else {
            callback("Something went wrong.", null);
        }
    }, 2000);
};

// Call the asynchronous function and pass in an error-first callback function
addCallback(5, 7, true, (err, result) => {
    if (err) {
        return console.log("Error!! ", err);
    }
    console.log("Result is: ", result);
    // In order to add another number example 10 to the above call back, you have to put it within the callback.
    addCallback(result, 10, true, (err, result2) => {
        if (err) {
            return console.log("Error!! ", err);
        }
        console.log("Result 2 is: ", result2);
    });
});
