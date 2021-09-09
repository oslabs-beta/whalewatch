//this file contains functions to use the docker engine API. we have refactored and are no longer using these
//however, I have kept the file in case a future iteration prefers to refactor with these

const dockerApiHelper = {};
const fetch = require('node-fetch');
const dockerPort = 'http://localhost:2375';

//all docker API calls will go here

//fetch a list of running containers from the docker engine API
dockerApiHelper.getContainerList = async () => {
  try {
    const response = await fetch(`${dockerPort}/containers/json?all=true&size=true`)
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('error in get container list: ', err)
  }
}

dockerApiHelper.inspectContainer = (id) => {
  fetch(`${dockerPort}/containers/${id}/json?size=true`)
    .then(result => result.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log('Error in docker helper inspect container: ', err))
}
const getDelta = (current, pre) => current - pre;

dockerApiHelper.getStats = async (id) => {
  try {
    const response = await fetch(`${dockerPort}/containers/${id}/stats?stream=false`)
    const stats = await response.json();
    return stats;

  } catch (err) {
    console.log('Error in docker helper inspect container: ', err)
  }
}

dockerApiHelper.startContainer = (id) => {
  fetch(`${dockerPort}/containers/${id}/start`, {
    method: 'POST'
  })
    .then(result => result.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log('Error in docker helper start container: ', err))
}

dockerApiHelper.stopContainer = (id) => {
  fetch(`${dockerPort}/containers/${id}/stop`, {
    method: 'POST'
  })
    .then(result => result.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log('Error in docker helper stop container: ', err))
}

dockerApiHelper.restartContainer = (id) => {
  fetch(`${dockerPort}/containers/${id}/restart`, {
    method: 'POST'
  })
    .then(result => result.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log('Error in docker helper restart container: ', err))
}

dockerApiHelper.removeContainer = (id) => {
  fetch(`${dockerPort}/containers/${id}`, {
    method: 'DELETE'
  })
    .then(result => result.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log('Error in docker helper delete container: ', err))
}


module.exports = dockerApiHelper;

