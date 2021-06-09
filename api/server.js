const express = require("express")
// const { restart } = require("nodemon")
const lessonsRoutes = require("../routes/lessonsRoutes")
const messagesRoutes = require("../routes/messagesRoutes")

const server = express()

// these are our endpoints

server.use(express.json()) // teach server about JSON

server.get('/', (req, res ) => {
    res.json({message: 'I am who I am'});
})

server.use('/api/lessons', lessonsRoutes)

server.use('/api/messages', messagesRoutes)


module.exports = server