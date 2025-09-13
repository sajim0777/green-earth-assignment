1) What is the difference between var, let, and const?

Ans: 

--- var 
- You can change it anytime.
- You can use it anywhere inside a function.
- But it can be a bit messy because it doesn’t follow new rules.

--- let
- You can change it too.
- It’s safer than var.

--- const
- You can’t change it once it’s set.
- Great for things that should stay the same.

2) What is the difference between map(), forEach(), and filter()?

--- Map()
- It also goes through each item.
- But it returns a new array with the results.
- Great for changing values.

--- forEach()
- It goes through each item in the array.
- You can run code for each item (like printing or changing something).
- But it doesn’t return a new array.

--- filter()
- Goes through each item.
- Keeps only the ones that match a condition.
- Returns a new array with those items.

3) What are arrow functions in ES6?

const greet = (name) => "Hello, " + name;


4) How does destructuring assignment work in ES6?

Instead of doing this:

let person = { name: "Alex", age: 25 };
let name = person.name;
let age = person.age;

i can do this:

let { name, age } = person;

5) Explain template literals in ES6. How are they different from string concatenation?


Instead of doing this:

let name = "Bopal";
let message = "Hello, " + name + "! Welcome to VSC.";

i can do this:

let name = "Bopal";
let message = `Hello, ${name}! Welcome to VSC.`;