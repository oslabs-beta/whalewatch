const dockerApiHelper = require('../helpers/dockerApiHelper');
const pool = require('../db/connect.js');
const dbHelper = {};

//these functions will parse the docker data and add it to the database if not already there

dbHelper.refreshContainerData = async (owner) => {
  try {
    const containers = await dockerApiHelper.getContainerList();
    const insertQuery = 'INSERT INTO containers (dockerId, name, size, state, owner) VALUES ($1, $2, $3, $4, $5)';
    for (container of containers) {
      const dockerId = container.Id;
      const name = container.Names[0].substring(1);
      const size = container.SizeRootFs;
      const state = container.State;
      //check if already there, if so, update size and state
      const checkContainer = await pool.query('SELECT * from containers WHERE dockerId=$1', [dockerId]);
      if (checkContainer.rows.length) {
        await pool.query('UPDATE containers SET size=$1, state=$2', [size, state]);
      } else {
        await pool.query(insertQuery, [dockerId, name, size, state, owner]);
      }
    }
  } catch (err) {
    console.log('error in refreshing container data', err);
  }
}

module.exports = dbHelper;