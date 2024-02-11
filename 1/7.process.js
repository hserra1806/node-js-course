//process is a global object that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require().
console.log(process.argv);

//control the process and its output
//process.exit(1);
//console.log("This will not show");

// process.on("exit", (code) => {
//   console.log("Process will exit with code: ", code);
// });

console.log(process.cwd());
