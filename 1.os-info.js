// Native Modules
const os = require('node:os')

console.log('OS Info: ', os.userInfo())
console.log('---------------------------------')
console.log('OS Platform: ', os.platform())
console.log('OS Version: ', os.version())
console.log('OS Architecture: ', os.arch())
console.log('OS Total Memory: ', os.totalmem() / 1024 / 1024)
console.log('OS Free Memory: ', os.freemem() / 1024 / 1024)
console.log('OS CPU: ', os.cpus())
console.log('OS Up Time: ', os.uptime())
