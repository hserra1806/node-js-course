const path = require("node:path");

// --> unix / or windows \
console.log(path.sep)//separator depending on the OS

//join routes using path.join
const filePath = path.join("./content", "subfolder", "test.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base)

const extention = path.extname(filePath);
console.log(extention)
