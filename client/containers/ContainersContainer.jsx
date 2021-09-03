import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql } from '@apollo/client';
import deleteContainer from "../assets/delete.png";
import stopContainer from "../assets/stop.png";
import restartContainer from "../assets/restart.png";
// import Auth from '../Auth.js';

const ContainersContainer = (props) => {
  const GET_CONTAINERS = gql`
    query containers {
    container(id:10) {
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
  activeContainers.map(container => {
    console.log('this is container,', container)
    containers.push(
      <ul id="containersList">
        <li> ID: <p className='value'>{container.id} </p> </li>
        <li> Name: <p className='value'>{container.name} </p> </li>
        <li> DockerID: <p className='value'>{container.id} </p></li>
        <li> Size: <p className='value'>{container.size} </p></li>
        <li> Status: <p className='value'>{container.status} </p></li>
      </ul>
    )
  })
  // if(Auth.isAuthenticated()){
  return (
    <>
      <div id='allContainers'>
        <NavBar />
        <div id='containersPage'>
          <span className='containerTitle'>Active Containers</span>
          <div className='containers'>
            {containers}
          </div>
          <div id="inactiveContainer">
            <span className='containerTitle'>Inactive Containers</span>
          </div>
        </div>
        <div id="actions">
          <div id='icons'>
            <p>Actions</p>
            <img src={deleteContainer} />
            <img src={stopContainer} />
            <img src={restartContainer} />
          </div>
        </div>
      </div>
    </>
  )
  // }  

}

export default ContainersContainer
