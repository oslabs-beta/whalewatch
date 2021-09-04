const dockerCliHelper = {};
const { exec } = require('child_process');

const parseCliJSON = (stdout) => {
  const output = [];
  let dockerOutput = stdout.trim();

  const objs = dockerOutput.split('\n');

  for (let i = 0; i < objs.length; i++) {
    output.push(JSON.parse(objs[i]))
  }
  return output;
}

dockerCliHelper.getContainerList = () => {
  exec(
    'docker ps --all  --size --format "{{json .}}"',
    //stdout output/stderr standard error
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      // console.log(parseCliJSON(stdout))
      return parseCliJSON(stdout);

    }
  )

}

dockerCliHelper.inspectContainer = (id) => {
  exec(
    `docker inspect --format "{{json .}}" ${id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      console.log(parseCliJSON(stdout))
      return parseCliJSON(stdout)
    }
  )
}
// dockerCliHelper.inspectContainer('5e92d0ef966e')

dockerCliHelper.getStats = (id) => {
  exec(
    `docker stats --no-stream --format "{{json .}}" ${id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      console.log(parseCliJSON(stdout));
      return parseCliJSON(stdout);
    }
  )
}
dockerCliHelper.getStats('31fd33e15314')

dockerCliHelper.startContainer = (id) => {
  exec(
    `docker start ${id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      return;
    }
  )
}

dockerCliHelper.stopContainer = (id) => {
  exec(
    `docker stop ${id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      return;
    }
  )
}

dockerCliHelper.restartContainer = (id) => {
  exec(
    `docker rm ${id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      return;
    }
  )
}

dockerCliHelper.removeContainer = (id) => {
  exec(
    `docker start ${id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      return;
    }
  )
}



module.exports = dockerCliHelper;