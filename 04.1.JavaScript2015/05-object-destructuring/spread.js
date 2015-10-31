var speaker = {
    firstName: "Samir",
    lastName: "Saghir",
    officePhone: "615-123-4567",
    mobilePhone: "615-987-6543",
    homePhone: "615-888-1234"
};

var {firstName, lastName, ...phoneNumbers} = speaker;

console.log(firstName);
console.log(lastName);
console.log(phoneNumbers);