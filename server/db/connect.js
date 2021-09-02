const { Pool } = require('pg');
const uri = 'postgres://xhvnddmn:JF9lN_N9dhSib-oqRKUPFuSEyVMMopcg@chunee.db.elephantsql.com/xhvnddmn'

const pool = new Pool({
<<<<<<< HEAD
  connectionString: uri, max: 3
=======
  connectionString: uri,
  max: 3
>>>>>>> dev
});

module.exports = pool;