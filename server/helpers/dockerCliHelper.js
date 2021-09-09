//these functions spawn a terminal to use the docker CLI
const dockerCliHelper = {};
const util = require('util');
const exec = util.promisify(require('child_process').exec);

//the output from docker CLI is not purely correct JSON, so this function takes in the output and creates an array of parsed objects
const parseCliJSON = (stdout) => {
  const output = [];
  let dockerOutput = stdout.trim();

  const objs = dockerOutput.split('\n');

  for (let i = 0; i < objs.length; i++) {
    output.push(JSON.parse(objs[i]))
  }
  return output;
}

//here we get a list of all running or stopped containers
dockerCliHelper.getContainerList = async () => {
  const { stdout, stderr } = await exec('docker ps --all  --size --format "{{json .}}"')
  if (stderr) {
    console.log(stderr);
    return stderr;
  }
  const output = parseCliJSON(stdout)
  return output;

}

//here we can inspect a container - this is not currently in use
dockerCliHelper.inspectContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker inspect --format "{{json .}}" ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return parseCliJSON(stdout)

}

//here we get stats for a particular container by docker id
dockerCliHelper.getStats = async (id) => {
  const { stdout, stderr } = await exec(`docker stats --no-stream --format "{{json .}}" ${id}`)
  if (stderr) {
    console.log(stderr);
    return;
  }
  return parseCliJSON(stdout);

}

//here we can start a container by docker id
dockerCliHelper.startContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker start ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}

//here we can stop a container by docker id
dockerCliHelper.stopContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker stop ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}

//here we can restart a container by docker id
dockerCliHelper.restartContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker restart ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}

//here we can remove a container by docker id - not currently in use
dockerCliHelper.removeContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker rm ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}



module.exports = { dockerCliHelper, parseCliJSON };