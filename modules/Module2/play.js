//Brayden Corbridge Fall 2025 IS 6700

// The numbers listed below are the code associated with the video tutorials


// ****************************************************************************
// 1
// var name = 'Max';
// var age = 29;
// var hasHobbies = true;

// console.log(name);

// function summarizeUser(userName, userAge, userHasHobby){
//     return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby
//     );
// }

// console.log(summarizeUser(name, age, hasHobbies));
// ****************************************************************************
// 2
// const name = 'Max';
// let age = 29;
// const hasHobbies = true;

// age = 30;

// function summarizeUser(userName, userAge, userHasHobby){
//     return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby
//     );
// }

// console.log(summarizeUser(name, age, hasHobbies));
// ****************************************************************************
// 3
// const name = 'Max';
// let age = 29;
// const hasHobbies = true;

// age = 30;

// const summarizeUser = (userName, userAge, userHasHobby) => {
//     return ('Name is ' + userName + ', age is ' + userAge + ' and the user has hobbies: ' + userHasHobby
//     );
// };

// const add = (a,b) => a + b;
// const addOne = a => a + 1;
// const addRandom = () => 1 + 2;

// console.log(add(1,2));
// console.log(addOne(1));
// console.log(addRandom());

// console.log(summarizeUser(name, age, hasHobbies));
// ****************************************************************************
// 4
// const person = {
//     name: 'Max',
//     age: 29,
//     greet() {
//         console.log('Hi, I am ' + this.name);
//     }
// };

// console.log(person);
// person.greet();
// ****************************************************************************
// 5
// const person = {
//     name: 'Max',
//     age: 29,
//     greet() {
//         console.log('Hi, I am ' + this.name);
//     }
// };

// const hobbies = ['Sports', 'Cooking'];
// for (let hobby of hobbies) {
//     console.log(hobby);
// }
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby));
// console.log(hobbies);
// ****************************************************************************
// 6
// const person = {
//     name: 'Max',
//     age: 29,
//     greet() {
//         console.log('Hi, I am ' + this.name);
//     }
// };

// const hobbies = ['Sports', 'Cooking'];

// hobbies.push('Programming');
// console.log(hobbies);
// ****************************************************************************
// 7
// const person = {
//     name: 'Max',
//     age: 29,
//     greet() {
//         console.log('Hi, I am ' + this.name);
//     }
// };

// const copiedPerson = {...person};
// console.log(copiedPerson);

// const hobbies = ['Sports', 'Cooking'];

// const copiedArray = [...hobbies];
// console.log(copiedArray);

// const toArray = (...args) => {
//     return args;
// };

// console.log(toArray(1, 2, 3, 4));
// ****************************************************************************
// 8
// const person = {
//     name: 'Max',
//     age: 29,
//     greet() {
//         console.log('Hi, I am ' + this.name);
//     }
// };

// const printName = ({ name }) => {
//     console.log(name);
// };

// printName(person);

// const { name, age} = person;
// console.log(name, age);

// const hobbies = ['Sports', 'Cooking'];
// const [hobby1, hobby2] = hobbies;
// console.log(hobby1, hobby2);
// ****************************************************************************
// 9
const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!')
        }, 1500);
    });
    return promise;
};

setTimeout(() => {
    console.log('Timer is done!');
    fetchData().then(text => {
        console.log(text);
        return fetchData();
    })
    .then(text2 => {
        console.log(text2);
    });
}, 2000);

console.log('Hello!');
console.log('Hi!');