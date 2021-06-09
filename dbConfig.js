const dbEngine = process.env.DB_ENVIRONMENT || "development" 
// we will set DB_ENVIRONMENT to production in heroku

const config = require("./knexfile")[dbEngine];
// if run local, run development, if run heroku, run production

module.exports = require('knex')(config);


