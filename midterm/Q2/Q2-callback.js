// Write the code for Question 2a here
const { error } = require('console');
const fs = require('fs');

fs.writeFile('working.txt', 'Creating new file...\n', 'utf8', (err) => {
    if (err) {
        console.log("Error creating file: ", err);
        return
    }
    console.log('File created!')

    const extraText = "Some extra information that is super important " + "\n" + "This is multiple lines now so it must be extra special"

    fs.appendFile('working.txt', extraText, (err) => {
        if (err) {
            console.log("Error creating file: ", err);
            return
        }
        console.log("Appended lines to file!");

        fs.readFile('working.txt','utf8', (err, data) => {
            if (err) {
                console.log("Error creating file: ", err);
                return
            }
            console.log("File Content:\n", data);

            fs.rename('working.txt', 'complete.txt', (err) => {
                if (err) {
                    console.log("Error creating file: ", err);
                    return
                }
                console.log("Renamed file!");
            });
        });
    });
});


