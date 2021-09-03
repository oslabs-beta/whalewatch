const dockerCliHelper = {};
import { exec } from 'child_process';

const parseCliJSON = (stdout) => {
  const output = [];
  let dockerOutput = stdout.trim();

  const objs = dockerOutput.split('\n');
  if (objs.length === 1) {
    return JSON.parse(objs[0].slice(0, -1))
  }
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

      return parseCliJSON(stdout);

    }
  )

}

dockerCliHelper.inspectContainer = (id) => {
  exec(
    `docker inspect --format "{{json .}}," ${id}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      //console.log(parseCliJSON(stdout))
      return parseCliJSON(stdout)
    }
  )
}


dockerCliHelper.getStats = () => {
  exec(
    'docker stats --no-stream --format "{{json .}},"',
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      return parseCliJSON(stdout);
    }
  )
}


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



export default dockerCliHelper;