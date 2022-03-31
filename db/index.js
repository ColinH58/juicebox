// inside db/index.js
const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost:5432/juicebox-dev');

// Helper function from part 1
async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username 
    FROM users;`
    );

  return rows;
}

// and export them
module.exports = {
  client,
  getAllUsers,
}
