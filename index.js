const express = require("express")

const server = express()

server.use(express.json()) // teach server about JSON

const PORT = 5000

server.get('/', (req, res ) => {
    res.json({message: 'I am who I am'})
})

server.listen(PORT, () => {
    console.log(`\n *** Server running on port ${PORT} ****\n`)
})

