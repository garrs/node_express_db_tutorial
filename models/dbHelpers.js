// where we write our knex queries
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

// better to name these methods different from axios' CRUD methods
module.exports = {
    add,
    findLesson,
    findMessage,
    findLessonById,
    findMessageById,
    remove,
    update,
    addMessage,
    findLessonMessages,
    removeMessage
};


async function add (lesson) {
    const [id] = await db('lessons').insert(lesson);
    return id
}

function findLesson () {
    // db is the entire database and lessons is just the table
    return db('lessons') // returns all the records
}

function findMessage () {
    // db is the entire database and lessons is just the table
    return db('messages') // returns all the records
}

function findLessonById (id) {
    
    return db('lessons')
    .where({id:id})
    .first()
}

function remove (id) {
    
    return db('lessons')
    .where({id}) // shorthand of id:id
    .del()
}

function update(id, changes) {
    return( 
    db('lessons')
    .where({id}) // short version than id:id
    .update(changes, [id]) // 2nd arg of [id] is way of returning
    .then(() => {
        return findLessonById(id)
    })
    ) 
}

function findMessageById (id) {
    return db('messages')
    .where({id})
    .first()
}

function findLessonMessages (lesson_id) {
    return db('lessons as l') // join parent table 'lessons' with child table 'messages' using FK of messages table
    .join("messages as m", "l.id", "m.lesson_id") // 2nd arg: primary key 3rd arg: foreign key
    .select(
        "l.id as LessonID", // aliasing
        "l.name as LessonName",
        "m.id as MessageID",
        "m.sender",
        "m.text"
    ).where({lesson_id}) // lesson_id from messages tables must equal lesson_id we passed here as arg
}

function removeMessage (id) { // we get the message id here
    return db('messages')
    .where({id})
    .del()
}

async function addMessage(message, lesson_id) {
    const [id] = await db('messages')
    .where({lesson_id}) // match lesson_id from messages table to the lesson_id arg here
    .insert(message);
    return findMessageById(id)
}