function createName(name) {
    if (typeof name === "string") {
        return name;
    }
    else {
        return name.join(" ");
    }
}
var greetingMessage = "Greetings, " + createName(["Samir", "Saghir"]);
console.log(greetingMessage);
//# sourceMappingURL=FlexType.js.map