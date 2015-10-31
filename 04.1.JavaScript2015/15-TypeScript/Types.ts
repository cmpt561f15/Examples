var height:number = 6;
var isDone:boolean = true;
var name:string = 'Samir';

var list:number[]; // = [1, 2, 3];
var list2:Array<number> = [1, 2, 3];

function add(x: number, y: number): number {
    return x+y;
}

class Student {
    firstName : string;
    height : number;
    constructor(name: string, height : number) {
        this.firstName = name;
        this.height = height;
    }
};

var student1 = new Student("Ahmed", 100);
console.log(student1.firstName)

console.log(add("a", "b"));

height = "Hello";

//console.log(list.join(", "));