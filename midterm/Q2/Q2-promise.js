// Write the code for Question 2b here
const fs = require('fs').promises

const extraText = "Some extra information that is super important " + "\n" + "This is multiple lines now so it must be extra special"

fs.writeFile('working.txt', 'Creating new file...\n', 'utf8')
.then(() => {
    console.log('File created!');
    return fs.appendFile('working.txt', extraText);
})
.then(() => {
    console.log("Appended lines to file!");
    return fs.readFile('working.txt','utf8');
})
.then((data) => {
    console.log("File Content:\n", data);
    return fs.rename('working.txt', 'complete.txt');
})
.then(() => {
    console.log("Renamed file!");
})
.catch(err => console.log("Error in file process: ", err));