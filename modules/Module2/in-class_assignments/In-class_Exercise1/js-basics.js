// // 1
// // Print your first and last name in double quotes with a line break in the middle.
// console.log("Brayden\nCorbridge");

// // 2
// // Store your first name in a variable in all lower case letters.  Then, use a string function to print the name in all upper case letters
// let firstName = "brayden";
// console.log(firstName.toUpperCase());

// // 3
// // Store your your first and last name in separate variables.  Then use string concatenation to put them together (with a space in the middle) and store in a separate variable.

// let firstName = "Brayden";
// let lastName = "Corbridge";
// let fullName = firstName + " " + lastName;

// // 4
// // Use string concatenation to print "Hi, my name is <<Full Name>>" where <<Full Name>> is your full name stored in a variable.
// let fullName = "Brayden Corbridge";
// console.log('Hi, my name is ' + fullName);

// 5
// With your full name stored in a variable, split your first and last name into separate variables.
let fullName = "Brayden Corbridge";
let array = fullName.split(" ");
let firstName = array[0];
let lastName = array[1];