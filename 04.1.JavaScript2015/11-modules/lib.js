export function square(x) {
    return x * x;
}

export function diag(x, y) {
    return Math.sqrt(square(x) + square(y));
}

export class Student {
    constructor(firstname, lastname) {
        this.firstName = firstname;
        this.lastName = lastname;
    }
    get name() {
        return this.firstName + ' ' + this.lastName;
    }
}
