function Person(name,age){
    this.name = name;
    this.age = age;
    this.toString = function() {
        return 'Name: ' + this.name + ', Age: ' + this.age;
    };
 }

var ali = new Person('Ali',23);
console.log(ali.toString());
var maria = new Person('Maria',18);
console.log(maria.toString());
