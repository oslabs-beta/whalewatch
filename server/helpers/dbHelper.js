const dockerApiHelper = require('../helpers/dockerApiHelper');
const pool = require('../db/connect.js');
const { container } = require('webpack');
const dbHelper = {};

//these functions will parse the docker data and add it to the database if not already there

const getDelta = (current, pre) => current - pre;

const refreshStats = async (dockerId, id) => {
  try {
    const stats = await dockerApiHelper.getStats(dockerId);
    const timestamp = stats.read;

    const cpuUsage = (((getDelta(stats.cpu_stats.cpu_usage.total_usage, stats.precpu_stats.cpu_usage.total_usage) / getDelta(stats.cpu_stats.system_cpu_usage, stats.precpu_stats.system_cpu_usage))) * stats.cpu_stats.online_cpus * 100.0).toFixed(2);
    const memUsage = (((stats.memory_stats.usage - stats.memory_stats.stats.cache) / stats.memory_stats.limit) * 100.0).toFixed(2);
    const netIo = `${stats.networks.eth0.rx_bytes}B / ${stats.networks.eth0.tx_bytes}B`;
    const blockIo = `${stats.blkio_stats.io_service_bytes_recursive[0].major}B / ${stats.blkio_stats.io_service_bytes_recursive[0].minor}B`
    const pids = stats.pids_stats.current;
    const vals = [id, timestamp, cpuUsage, memUsage, netIo, blockIo, pids]
    await pool.query('INSERT INTO STATS (container, timestamp, cpuUsage, memUsage, netIo, blockIo, pids) VALUES ($1, $2, $3, $4, $5, $6, $7)', vals)
  } catch (err) {
    console.log('error in refreshing stats data', err)
  }
}

dbHelpear.refreshContainerData = async (owner) => {
  try {
    const containers = await dockerApiHelper.getContainerList();
    const insertQuery = 'INSERT INTO containers (dockerId, name, size, state, owner) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    for (let container of containers) {
      const dockerId = container.Id;
      const name = container.Names[0].substring(1);
      const size = container.SizeRootFs;
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