// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3', // what kind of database we are using
    useNullAsDefault: true,
    connection: {
      filename: './data/lessons.db3' // where the db lives
    }, 
    pool:{
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  }
};
// make a change to a table or create a table, its called a migration
// the created file in the migrations folder is like a git where it keeps track of changes made to table