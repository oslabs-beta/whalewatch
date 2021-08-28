const dockerCliHelper = {};
import { exec } from 'child_process';

dockerApiHelper.getContainerList = () => {
  exec(
    'docker ps --all --format "{{json .}}," --size',
    (error, stdout, stderr) => {

    }
  )

}

dockerApiHelper.inspectContainer = (id) => {
  exec(
    `docker inspect --format "{{json .}}," ${id}`,
    (error, stdout, stderr) => {

    }
  )
}

dockerApiHelper.getStats = () => {
  exec(
    'docker stats --no-stream --format "{{json .}},"',
    (error, stdout, stderr) => {

    }
  )
}

dockerApiHelper.startContainer = (id) => {
  exec(
    `docker start ${id}`,
    (error, stdout, stderr) => {

    }
  )
}

dockerApiHelper.stopContainer = (id) => {
  exec(
    `docker stop ${id}`,
    (error, stdout, stderr) => {

    }
  )
}

dockerApiHelper.restartContainer = (id) => {
  exec(
    `docker rm ${id}`,
    (error, stdout, stderr) => {

    }
  )
}

dockerApiHelper.removeContainer = (id) => {
  exec(
    `docker start ${id}`,
    (error, stdout, stderr) => {

    }
  )
}



export default dockerCliHelper;