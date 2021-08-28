const dockerCliHelper = {};
import { exec } from 'child_process';

dockerApiHelper.getContainerList = () => {
  exec(
    'docker ps --all --format "{{json .}}," --size',
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
        return;
      }
      return [...stdout];
    }
  )

}

dockerApiHelper.inspectContainer = (id) => {
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
      return [...stdout];
    }
  )
}

dockerApiHelper.getStats = () => {
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
      return [...stdout];
    }
  )
}

dockerApiHelper.startContainer = (id) => {
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

dockerApiHelper.stopContainer = (id) => {
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

dockerApiHelper.restartContainer = (id) => {
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

dockerApiHelper.removeContainer = (id) => {
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