const ditto = require('./pokemon/ditto.json')
const express = require('express')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.use(express.json())

// app.use((req, res, next) => {
//     if (req.method !== 'POST') return next()
//     if (req.headers['content-type'] !== 'application/json') return next()
//     console.log('my first middleware')
//     // track request and save to database
//     // check if user is logged in, etc

//     let body = ''

//     req.on('data', chunk => {
//         body += chunk.toString()
//     })

//     req.on('end', () => {
//         const data = JSON.parse(body)
//         data.timestamp = Date.now()
//         //muting the data
//         req.body = data
//         next()
//     })
// })

app.get('/pokemon/ditto', (req, res) => {
    res.json(ditto)
})

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)
})

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})