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
    <ul id = "containersList">
        <li> container_id : {container.id} </li>
        <li> container_name : {container.name} </li>
        <li> container_dockerid: {container.dockerid}</li>
        <li> container_size: {container.size} </li>
        <li> container_status: {container.status}</li>
    </ul>
  )
    })
  return (
    <>
    <div id = 'allContainers'>
      <NavBar />
      <div id = 'containersPage'>
        <span className = 'containerTitle'>Active Containers</span>
        <div className = 'containers'>
          {containers}
        </div>
        <div>
          <span className = 'containerTitle'>Inactive Containers</span>
        </div>
      </div>
      <div id = "actions">
          Actions
          <img src = {deleteContainer}/>
          <img src = {stopContainer}/>
          <img src = {restartContainer}/>
        </div>
    </div>
    </>
  )
}

export default withAuth(ContainersContainer);