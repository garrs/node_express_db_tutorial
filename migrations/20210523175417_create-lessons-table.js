
exports.up = function(knex) {
  return knex.schema
  .createTable('Lessons', tbl => {
    tbl.increments(); // has an 'id' field
    tbl.text('name', 128)
        .notNullable();
    tbl.timestamps(true, true); //when created and modified
  })
  .createTable('Messages',  tbl => {
    tbl.increments();
    tbl.string('sender')
        .notNullable()
        .index();
    tbl.text('text')
        .notNullable();
    tbl.timestamps(true, true); //when created and modified
    // below is foreign key
    tbl.integer('lesson_id') 
        .unsigned()
        .notNullable()
        .references('id') // references the id field of the lessons table
        .inTable('lessons')
        .onDelete('CASCADE') // way to keep info tidied up
        .onUpdate('CASCADE');
  })
};

// this exports.down is to undo changes
exports.down = function(knex) {
    // below finds a way to undo what we do everything up from above
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons');
};
