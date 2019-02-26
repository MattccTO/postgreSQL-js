const settings = require('./settings');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const fame = process.argv.slice(2, 5);

const fameInsert = [{ first_name: fame[0], last_name: fame[1], birthdate: fame[2] }];

knex('famous_people').insert(fameInsert)
  .then(() => {
    console.log('Data successfully inserted.');
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    knex.destroy();
  });
