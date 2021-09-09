const dockerApiHelper = require('./dockerApiHelper');
const pool = require('../db/connect.js');
const { container } = require('webpack');
const dbHelper = {};
const { dockerCliHelper } = require('./dockerCliHelper');

//these functions will parse the docker data and add it to the database if not already there

//this function takes in a given container's docker ID and database ID and queries for stats for the container, then adds them to the database
const refreshStats = async (dockerId, id) => {
  try {
    const stats = await dockerCliHelper.getStats(dockerId);
    let timestamp = new Date(Date.now());
    const cpuUsage = stats[0].CPUPerc.slice(0, -1);
    const memUsage = stats[0].MemPerc.slice(0, -1);
    const netIo = stats[0].NetIO
    const blockIo = stats[0].BlockIO;
    const pids = stats[0].PIDs;
    const vals = [id, timestamp, cpuUsage, memUsage, netIo, blockIo, pids]
    await pool.query('INSERT INTO STATS (container, timestamp, cpuUsage, memUsage, netIo, blockIo, pids) VALUES ($1, $2, $3, $4, $5, $6, $7)', vals)
  } catch (err) {
    console.log('error in refreshing stats data', err)
  }
}

//this function takes in a user's database id and retrieves a list of all containers on their computer. 
//it then either updates or inserts each container
dbHelper.refreshContainerData = async (owner) => {
  try {
    const containers = await dockerCliHelper.getContainerList();
    const insertQuery = 'INSERT INTO containers (dockerId, name, size, state, owner, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    for (let container of containers) {
      const dockerId = container.ID;
      const name = container.Names;
      const size = container.Size;
      const state = container.State;
      let status;

      if (container.Status.includes('unhealthy')) {
        status = 'unhealthy';
      } else status = 'healthy';
      //check if already there, if so, update size and state
      const checkContainer = await pool.query('SELECT * from containers WHERE dockerId=$1 AND owner=$2', [dockerId, owner]);
      if (checkContainer.rows.length) {
        await pool.query('UPDATE containers SET size=$1, state=$2, status=$3 WHERE dockerId=$4 AND owner=$5', [size, state, status, dockerId, owner]);
        if (state === 'running') {
          await refreshStats(dockerId, checkContainer.rows[0].id);
        }
      } else {
        const dbId = await pool.query(insertQuery, [dockerId, name, size, state, owner, status]);
        if (state === 'running') {
          await refreshStats(dockerId, dbId.rows[0].id);
        }
      }
    }
  } catch (err) {
    console.log('error in refreshing container data', err);
  }
}

//this function stops a container by docker id and updates the database with its stopped state
dbHelper.stopContainer = async (id) => {
  try {
    await dockerCliHelper.stopContainer(id);
    const stopQuery = 'UPDATE containers SET state=$1 WHERE dockerid=$2';
    await pool.query(stopQuery, ['exited', id]);
  } catch (err) { console.log(err) }
}

//this function restarts a container by docker id and updates the database with its running state
dbHelper.restartContainer = async (id) => {
  try {
    await dockerCliHelper.restartContainer(id);
    const stopQuery = 'UPDATE containers SET state=$1 WHERE dockerid=$2';
    await pool.query(stopQuery, ['running', id]);
  } catch (err) { console.log(err) }
}

module.exports = dbHelper;