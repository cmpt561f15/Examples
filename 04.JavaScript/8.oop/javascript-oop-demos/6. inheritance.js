function Person(name, age) {
    this.name = name;
    this.age = age;

    this.toString = function() {
        var str = '';
        for (var prop in this) {
            if (this.hasOwnProperty(prop) && (typeof this[prop] !== 'function')) {
                str += '{' + prop + ': ' + this[prop] + '}, ';
            }
        }

        return str.substring(0, str.length - 2);
    };
}

function Student(name, age, grade) {
    Person.apply(this, arguments);
    //Person.call(this, name, age);
    //or you can use - Person.call(this, name, age);
    this.grade = grade;
}

Student.prototype = new Person();
Student.prototype.constructor = Student;

var samir = new Student('Samir', 5, 1);
console.log(samir);
console.log(samir.toString());
console.log(samir instanceof Student);
console.log(samir instanceof Person);
console.log(samir instanceof Object);