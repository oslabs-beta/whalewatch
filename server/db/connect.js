const { Pool } = require('pg');
const uri = 'postgres://xhvnddmn:JF9lN_N9dhSib-oqRKUPFuSEyVMMopcg@chunee.db.elephantsql.com/xhvnddmn'

const pool = new Pool({
  connectionString: uri, max: 3
});

module.exports = pool;