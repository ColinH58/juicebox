// inside db/seed.js
// grab our client with destructuring from the export in index.js
const { client } = require('./index');

async function testDB() {
  try {
    // connect the client to the database, finally
    client.connect();

    await client.query(`
      DROP TABLE IF EXISTS users;
    `)
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
      );
    `)
    await client.query(`
    INSERT INTO users (username, password)
    VALUES
    ('albert', 'bertie99'),
    ('sandra', '2sandy4me'),
    ('glamgal', 'soglam');
    `)
    // queries are promises, so we can await them
    const { rows } = await client.query(`SELECT * FROM users;`);

    // for now, logging is a fine way to see what's up
    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    // it's important to close out the client connection
    client.end();
  }
}

testDB();
