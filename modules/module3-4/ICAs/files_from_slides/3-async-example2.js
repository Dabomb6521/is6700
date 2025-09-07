console.log("Starting");

let sumSync = addSync(5, 10);

console.log("The sync sum is " + sumSync);

let sumAsync = addAsync(5, 7);

console.log("The async sum is " + sumAsync);

console.log("Stopping");

function addSync (x, y) {
    return x + y;
}

function addAsync (x, y) {
    setTimeout(() => {
        return x + y;
    }, 5000)
    
}




