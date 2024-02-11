const fs = require("node:fs/promises");

//IIFE - Immediately Invoked Function Expression
(async () => {
  console.log("Reading file 1...");
  const text = await fs.readFile("./file.txt", "utf-8");
  console.log("Text 1: ", text);

  console.log("Do things while reading file 1...");
  console.log("Reading file 2...");
  const text2 = await fs.readFile("./file2.txt", "utf-8");
  console.log("Text 2: ", text2);
})();
