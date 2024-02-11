const http = require('node:http')
const { getFreePort } = require('./10.free-port.js')

const server = http.createServer((req, res) => {
  res.end('Hello World')
})

getFreePort(8080).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
