"use strict";

var height = 6;
var isDone = true;
var name = 'Samir';
var list; // = [1, 2, 3];
var list2 = [1, 2, 3];
function add(x, y) {
    return x + y;
}
var Student = (function () {
    function Student(name, height) {
        this.firstName = name;
        this.height = height;
    }
    return Student;
})();
;
var student1 = new Student("Ahmed", 100);
console.log(student1.firstName);
console.log(add("a", "b"));
height = "Hello";
//console.log(list.join(", "));
//# sourceMappingURL=Types.js.map

//# sourceMappingURL=Types-compiled.js.map