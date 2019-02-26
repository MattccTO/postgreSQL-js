const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const famousLookup = process.argv[2];

function dateFormatter(date) {
  return date.toISOString().substr(0, 10);
}

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  client.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1::text OR last_name = $1::text', [famousLookup], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    const famousList = result.rows;
        console.log('Searching...');
    // console.log(famousList);
    console.log(`Found ${famousList.length} person(s) by the name of '${famousLookup}':`);
    famousList.forEach((item, i) => {
      const date = dateFormatter(famousList[i].birthdate);
      console.log(`${i}: ${famousList[i].first_name} ${famousList[i].last_name}, born '${date}'`);
    });
    client.end();
  });
});
