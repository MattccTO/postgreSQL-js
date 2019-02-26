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

function dateFormatter(date) {
  return date.toISOString().substr(0, 10);
}

const fameName = process.argv[2];

knex('famous_people')
  .where('first_name', fameName)
  .orWhere('last_name', fameName)
  .then((rows) => {
    console.log('Searching...');
    console.log(`Found ${rows.length} person(s) by the name of '${fameName}':`);
    rows.forEach((item, i) => {
      const date = dateFormatter(rows[i].birthdate);
      console.log(`${i+1}: ${rows[i].first_name} ${rows[i].last_name}, born '${date}'`);
    });
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    knex.destroy();
  });
