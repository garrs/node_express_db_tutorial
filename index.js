const express = require("express")
const Lessons = require('./models/dbHelpers')
const server = express()

server.use(express.json()) // teach server about JSON

const PORT = 5000

server.get('/', (req, res ) => {
    res.json({message: 'I am who I am'});
})

server.post('/api/lessons', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch( error => {
        res.status(500).json({message: 'cannot add lesson'});
    })
})

server.get('/api/lessons', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch( error => {
        res.status(500).json({message: 'unable to retrieve lessons'});
    })
})

server.get('/api/lessons/:id', (req, res ) => {
    const {id} = req.params;

    Lessons.findById(id)
    .then(lesson => {
        if(lesson){
            res.status(200).json(lesson)
        } else {
            res.status(404).json({message: 'record not found'});
        }
    })
    .catch( error => {
        res.status(500).json({message: 'unable to perform find by ID operation'});
    })
})

server.delete('/api/lessons/:id', (req, res ) => {
    const {id} = req.params;

    Lessons.remove(id)
    // returns number of affected rows it deleted
    .then(count => {
        if(count){
            res.status(200).json({message: 'record deleted'})
        } else {
            res.status(404).json({message: 'record to delete not found'});
        }
    })
    .catch( error => {
        res.status(500).json({message: 'unable to perform delete operation'});
    })
})

server.patch('/api/lessons/:id', (req, res ) => {
    const {id} = req.params;
    const changes = req.body

    Lessons.update(id, changes)
    // returns number of affected rows it deleted
    .then(lesson => { // lesson variable here is actually the returned {id}
        if(lesson){
            res.status(200).json(lesson)
        } else {
            res.status(404).json({message: 'record not found'});
        }
    })
    .catch( error => {
        res.status(500).json({message: 'unable to perform update operation'});
    })
})


server.listen(PORT, () => {
    console.log(`\n *** Server running on port ${PORT} ****\n`);
})

