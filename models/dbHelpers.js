// where we write our knex queries
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

// better to name these methods different from axios' CRUD methods
module.exports = {
    add,
    find,
    findById,
    remove,
    update
};


async function add (lesson) {
    const [id] = await db('lessons').insert(lesson);
    return id
}

function find () {
    // db is the entire database and lessons is just the table
    return db('lessons') // returns all the records
}

function findById (id) {
    
    return db('lessons')
    .where({id:id})
    .first()
}

function remove (id) {
    
    return db('lessons')
    .where({id:id})
    .del()
}

function update(id, changes) {
    return( 
    db('lessons')
    .where({id}) // short version than id:id
    .update(changes, [id]) // 2nd arg of [id] is way of returning
    .then(() => {
        return findById(id)
    })
    ) 
}