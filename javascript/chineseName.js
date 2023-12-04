const randomName = require("chinese-random-name");

console.log(randomName.generate());
console.log(randomName.names.get2("木水"));
console.log(randomName.names.get2());

name2 = randomName.names.get2();
const greeting = "hello ";
const greetPerson = greeting + name2;
console.log(greetPerson);

// Examples:
// randomName.names.get();
// randomName.names.get1();
// randomName.names.get2();
// randomName.names.get3();
// randomName.names.get1("金");
// randomName.names.get2("木水");
// randomName.names.get3("火火火");
