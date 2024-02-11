const fs = require("node:fs/promises");

console.log("Reading file 1...");
fs.readFile("./file.txt", "utf-8").then((text) => {
    console.log("Text 1: ", text);
});

console.log("Do things while reading file 1...");

console.log("Reading file 2...");
fs.readFile("./file2.txt", "utf-8").then((text) => {
    console.log("Text 2: ", text);
});