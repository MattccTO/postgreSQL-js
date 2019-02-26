
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.alterTable('milestones', (table) => {
      table.integer('famous_people_id').references('famous_people.id');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropColumn('famous_people_id')
  ]);
};
