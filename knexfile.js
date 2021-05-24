// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lessons.db3'
    }
  },
  useNullAsDefault: true
};
// make a change to a table or create a table, its called a migration
// the created file in the migrations folder is like a git where it keeps track of changes made to table