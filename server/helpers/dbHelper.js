const dockerApiHelper = require('../helpers/dockerApiHelper');
const dbHelper = {};

dbHelper.refreshContainerData = async () => {
  const containers = await dockerApiHelper.getContainerList;
  const insertQuery = 'INSERT INTO containers ('
}

module.exports = dbHelper;