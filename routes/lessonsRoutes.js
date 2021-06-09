const Lessons = require('../models/dbHelpers')
const express = require("express")

const router = express.Router()

// all endpoints are for /api/lessons

router.post('/', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson);
    })
    .catch( error => {
        res.status(500).json({message: 'cannot add lesson'});
    })
})

router.get('/', (req, res) => {
    Lessons.findLesson()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch( error => {
        res.status(500).json({message: 'unable to retrieve lessons'});
    })
})

router.get('/:id', (req, res ) => {
    const {id} = req.params;

    Lessons.findLessonById(id)
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

router.delete('/:id', (req, res ) => {
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

router.patch('/:id', (req, res ) => {
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

router.post('/:id/messages', (req, res) => {
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

router.get('/:id/messages', (req, res) => {
    const {id} = req.params
    
    Lessons.findLessonMessages(id)
    .then(lessons =>{
        res.status(200).json(lessons)
    })
    .catch( error => {
        res.status(500).json({message: 'error retrieving messages'});
    })
})

module.exports = router