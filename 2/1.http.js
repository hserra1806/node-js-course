const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT || 1234

const processRequest = (req, res) => {
  console.log('Request received: ', req.url)
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Welcome to the homepage!</h1>')
  } else if (req.url === '/imagen-super-bonita.jpeg'){
    res.setHeader('Content-Type', 'image/jpg')
    fs.readFile('./place.jpeg', (err, data) => {
        if (err) {
            res.statusCode = 500
            res.end('<h1>500 Internal Server Error</h1>')
        } else {
            res.setHeader('Content-Type', 'image/jpeg')
            res.end(data)
        }
    })
  } else if (req.url === '/contact') {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Welcome to the contact page!</h1>')
  } else {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Page not found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
