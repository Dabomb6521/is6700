// // ES6 module imports

// // Import Default
// import something from './export-demo.js' // This gives the value of variable1 from export-demo.js

// // Import named exports
// // Use object Destructoring
// import {variable2, myFunction as myCustomName} from './export-demo.js';

// console.log(something, " is the value from export-demo");

// CommonJS module imports
// const {variable3, variable4, variable5} = require('./export-demo.js');
const imports = require('./export-demo.js'); 

console.log("Variable 3 from the export-demo file is: ", imports.variable3);
console.log("Variable 4 from the export-demo file is: ", imports.variable4);
// console.log("Variable 5 from the export-demo file is: ", variable5);