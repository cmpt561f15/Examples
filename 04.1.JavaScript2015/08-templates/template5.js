var contact = {
    firstName: "Samir",
    lastName: "Saghir",
    email: "samir@fun.com",
    twitter: "@samir"
};

var html = `
    <div>
        <h1>${contact.firstName} ${contact.lastName}</h1>
        <p>Email: ${contact.email}</p>
        <p>Twitter: ${contact.twitter}</p>
    </div>
    `;

console.log(html);