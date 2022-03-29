const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/juicebox_dev');

module.exports = {
  client,
};
