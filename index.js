const express = require("express")
const { restart } = require("nodemon")
const Lessons = require('./models/dbHelpers')
const server = express()

// these are our endpoints

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

server.post('/api/lessons/:id/messages', (req, res) => {
    const {id} = req.params;
    const msg = req.body;

    if (!msg.lesson_id) { // if lesson_id doesnt already exist there.. lets add it with the code below
        msg['lesson_id'] = parseInt(id, 10) // assign id gotten from the database to msg(lesson) keyvalue pair
    }

    Lessons.findLessonById(id)
    .then(lesson => {
        if (!lesson) {
            res.status(404).json('invalid ID');
        }
        // check for all required fields with conditions below
        if (!msg.sender || !msg.text){
            res.status(400).json('message must provide both sender and text values');
        }
        Lessons.addMessage(msg, id)
        .then(message => {
            if (message) {
                res.status(200).json(message)
            }
        })
        .catch(error => {
            res.status(500).json('failed to add message');
        })
    })
    .catch( error => {
        res.status(500).json({message: 'error finding lesson'});
    })
})

server.get('/api/lessons/:id/messages', (req, res) => {
    const {id} = req.params
    
    Lessons.findLessonMessages(id)
    .then(lessons =>{
        res.status(200).json(lessons)
    })
    .catch( error => {
        res.status(500).json({message: 'error retrieving messages'});
    })
})

server.delete("/api/messages/:id", (req, res) => {
    const {id} = req.params
    
    Lessons.removeMessage(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: `message with ID ${id} was successfully deleted`})
        } else {
            res.status(404).json({message: 'no message with that ID'});
        }
    })
    .catch( error => {
        res.status(500).json({message: 'error deleting message'});
    })
})

server.listen(PORT, () => {
    console.log(`\n *** Server running on port ${PORT} ****\n`);
})

