// where we write our knex queries
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

// better to name these methods different from axios' CRUD methods
module.exports = {
    add,
    find,
    findLessonById,
    findMessageById,
    remove,
    update,
    addMessage
};


async function add (lesson) {
    const [id] = await db('lessons').insert(lesson);
    return id
}

function find () {
    // db is the entire database and lessons is just the table
    return db('lessons') // returns all the records
}

function findLessonById (id) {
    
    return db('lessons')
    .where({id:id})
    .first()
}

function remove (id) {
    
    return db('lessons')
    .where({id})
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

async function addMessage(message, lesson_id) {
    const [id] = await db('messages')
    .where({lesson_id}) // match lesson_id from messages table to the lesson_id arg here
    .insert(message);
    return findMessageById(id)
}