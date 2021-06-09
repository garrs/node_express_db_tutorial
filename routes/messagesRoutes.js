const Lessons = require('../models/dbHelpers')
const Messages = require('../models/dbHelpers')
const express = require("express")

const router = express.Router()

// all endpoints are for /api/messages

router.get('/', (req, res) => {
    Messages.findMessage()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch( error => {
        res.status(500).json({message: 'unable to retrieve messages'});
    })
})

router.delete("/:id", (req, res) => {
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

module.exports = router