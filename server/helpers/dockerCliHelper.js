const dockerCliHelper = {};
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const parseCliJSON = (stdout) => {
  const output = [];
  let dockerOutput = stdout.trim();

  const objs = dockerOutput.split('\n');

  for (let i = 0; i < objs.length; i++) {
    output.push(JSON.parse(objs[i]))
  }
  return output;
}

dockerCliHelper.getContainerList = async () => {
  const { stdout, stderr } = await exec('docker ps --all  --size --format "{{json .}}"')
  if (stderr) {
    console.log(stderr);
    return stderr;
  }
  const output = parseCliJSON(stdout)
  return output;

}

dockerCliHelper.inspectContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker inspect --format "{{json .}}" ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return parseCliJSON(stdout)

}

dockerCliHelper.getStats = async (id) => {
  const { stdout, stderr } = await exec(`docker stats --no-stream --format "{{json .}}" ${id}`)
  if (stderr) {
    console.log(stderr);
    return;
  }
  return parseCliJSON(stdout);

}

dockerCliHelper.startContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker start ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}

dockerCliHelper.stopContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker stop ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}

dockerCliHelper.restartContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker restart ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}

dockerCliHelper.removeContainer = async (id) => {
  const { stdout, stderr } = await exec(`docker rm ${id}`)

  if (stderr) {
    console.log(stderr);
    return;
  }
  return;

}



module.exports = { dockerCliHelper, parseCliJSON };