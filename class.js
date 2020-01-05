
class User {
  constructor(name) { this.name = name; }
  sayHi() { console.log(this.name); }
}
let jack = new User.prototype.constructor('Jack'); // same as 'new User('Jack')'
console.log(jack);

// class is a function:
console.log(typeof User); // function

// ... more precisely a constructor method:
console.log(User === User.prototype.constructor); // true

// methods are in User.prototype:
console.log(User.prototype.sayHi); // [Function: sayHi]

// ...there are two methods:
console.log(Object.getOwnPropertyNames(User.prototype)); // [ 'constructor', 'sayHi' ]

// Class is not just a syntactic suger:

// rewriting class User in pure functions:

function User2(name) {
  this.name = name;
}

User2.prototype.greet = function() {
  console.log('Hello,', this.name);
}

let tom = new User2('Tom');
tom.greet();

for (let prop in jack) {
  console.log(`${prop}: ${jack[prop]}`); // name
}

for (let prop in tom) {
  console.log(prop); // name, greet
}

// if a class expression has a name, it’s visible inside the class only:
let User3 = class MyClass {
  msg() {
    console.log(MyClass);
  }
}

new User3().msg(); // [Function: MyClass]
// console.log(MyClass); <- error

// we can create a class dynamically:
function createClass(text) {
  return class {
    log() {
      return console.log(text);
    }
  }
}

let myClass = createClass('Hello class');
new myClass().log(); // Hello class

// Getters and setters in a class:

class User4 {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return console.log(this._name);
  }

  set name(str) {
    if (str.length < 3) {
      return console.log('The name is too short.');
    }
    this._name = str;
  }
}

let usr4 = new User4('Harry');
usr4.name; // Harry
usr4.name = 'George';
usr4.name; // George
