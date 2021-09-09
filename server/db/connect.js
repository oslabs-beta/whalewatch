//setting up connection to the database
require('dotenv').config();
const { Pool } = require('pg');
const uri = process.env.DB_URI;
const pool = new Pool({
  connectionString: uri,
  max: 3
});

module.exports = pool;