const dockerApiHelper = require('./dockerApiHelper');
const pool = require('../db/connect.js');
const { container } = require('webpack');
const dbHelper = {};
const dockerCliHelper = require('./dockerCliHelper');

//these functions will parse the docker data and add it to the database if not already there

const getDelta = (current, pre) => current - pre;

const refreshStats = async (dockerId, id) => {
  try {
    const stats = await dockerCliHelper.getStats(dockerId);
    const timestamp = Date.now();

    const cpuUsage = stats.CPUPerc.slice(0, -1);
    const memUsage = stats.MemPerc.slice(0, -1);
    const netIo = stats.NetIO
    const blockIo = stats.BlockIO;
    const pids = stats.PIDs;
    const vals = [id, timestamp, cpuUsage, memUsage, netIo, blockIo, pids]
    await pool.query('INSERT INTO STATS (container, timestamp, cpuUsage, memUsage, netIo, blockIo, pids) VALUES ($1, $2, $3, $4, $5, $6, $7)', vals)
  } catch (err) {
    console.log('error in refreshing stats data', err)
  }
}

dbHelper.refreshContainerData = async (owner) => {
  try {
    const containers = await dockerCliHelper.getContainerList();
    const insertQuery = 'INSERT INTO containers (dockerId, name, size, state, owner) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    for (let container of containers) {
      const dockerId = container.ID;
      const name = container.Names;
      const size = container.Size.slice(0, container.Size.indexOf('B'));
      const state = container.State;
      //check if already there, if so, update size and state
      const checkContainer = await pool.query('SELECT * from containers WHERE dockerId=$1', [dockerId]);
      if (checkContainer.rows.length) {
        await pool.query('UPDATE containers SET size=$1, state=$2', [size, state]);
        if (state === 'running') {
          await refreshStats(dockerId, checkContainer.rows[0].id);
        }
      } else {
        const dbId = await pool.query(insertQuery, [dockerId, name, size, state, owner]);
        if (state === 'running') {
          await refreshStats(dockerId, dbId.rows[0].id);
        }
      }
    }
  } catch (err) {
    console.log('error in refreshing container data', err);
  }
}



module.exports = dbHelper;