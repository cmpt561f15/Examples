/**
 * Classes and Inheritance
 * Code Example from http://www.es6fiddle.net/
 */
class Polygon {
    constructor(height, width) { //class constructor
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }

    sayName() { //class method
        console.log('Hi, I am a', this.name + '.');
    }

    get area() { //calculated attribute getter
        return this.height * this.width;
    }
}

class Square extends Polygon {
    constructor(length=10) { // ES6 features Default Parameters
        super(length, length); //call the parent method with super
        this.name = 'Square';
    }
}

let s = new Square(5);

s.sayName(); // => Hi, I am a Square.
console.log(s.area); // => 25

console.log(new Square().area); // => 100