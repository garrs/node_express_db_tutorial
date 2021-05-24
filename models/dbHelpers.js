// where we write our knex queries
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

module.exports = {
    add,
    find
};


async function add (lesson) {
    const [id] = await db('lessons').insert(lesson);
    return id
}

function find () {
    // db is the entire database and lessons is just the table
    return db('lessons') // returns all the records
}