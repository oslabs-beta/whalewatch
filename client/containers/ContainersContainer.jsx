import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql } from '@apollo/client';
import deleteContainer from "../assets/delete.png";
import stopContainer from "../assets/stop.png";
import restartContainer from "../assets/restart.png";

const ContainersContainer = (props) => {
  const GET_CONTAINERS = gql`
    query containers {
    container {
      id
      dockerid
      name
      size
      status
    }
  }
`;
  const { loading, error, data } = useQuery(GET_CONTAINERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)

  //store containers
  const activeContainers = data.container;
  console.log('this is active containers', activeContainers)
  const containers = [];
  activeContainers.map(container =>{
    console.log('this is container,', container)
    containers.push(
    <div className = 'activeContainers' style = {{display: 'flex', borderStyle: 'solid'}}>
    <ul style = {{listStyleType: 'none', margin: 'none', padding: 'none'}}>
        <li> container_id : {container.id} </li>
        <li> container_name : {container.name} </li>
        <li> container_dockerid: {container.dockerid}</li>
        <li> container_size: {container.size} </li>
        <li> container_status: {container.status}</li>
    </ul>
    </div>
  )
    })
  return (
    <div id = 'containersContainer' style = {{color: 'green', display: 'flex'}}>
      <NavBar />
      {containers}
      <div>Inactive Containers</div>
      <div>
        Actions
        <img src = {deleteContainer}/>
        <img src = {stopContainer}/>
        <img src = {restartContainer}/>
      </div>

    </div>
  )
}

export default withAuth(ContainersContainer);