import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql } from '@apollo/client';
import deleteContainer from "../assets/delete.png";
import stopContainer from "../assets/stop.png";
import restartContainer from "../assets/restart.png";
import DndContainers from "../components/dockerContainer/DndContainers"
import TrashCan from "../components/dockerContainer/TrashCan"

// Do I need this?
// import { DragDropContext } from 'react-dnd';


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
//   const activeContainers = data.container;
//   console.log('this is active containers', activeContainers)
//   const containers = [];
//   activeContainers.map(container => {
//     // console.log('this is container,', container)
//     containers.push(
//     // <ul id = "containersList">
//     //     <li> ID: <p className = 'value'>{container.id} </p> </li>
//     //     <li> Name: <p className = 'value'>{container.name} </p> </li>
//     //     <li> DockerID: <p className = 'value'>{container.id} </p></li>
//     //     <li> Size: <p className = 'value'>{container.size} </p></li>
//     //     <li> Status: <p className = 'value'>{container.status} </p></li>
//     // </ul>
// ) 
//     });

  return (
    <div className='dashbaordContainer'>
      
    {/* <div id = 'allContainers'>
      <NavBar />
      <div id = 'containersPage'>
        <span className = 'containerTitle'>Active Containers</span>
        <div className = 'containers'>
          {containers}
        </div>
        <div id = "inactiveContainer">
          <span className = 'containerTitle'>Inactive Containers</span>
        </div>
      </div>
      <div id = "actions">
        <div id = 'icons'>
          <p>Actions</p>
          <img src = {deleteContainer}/>
          <img src = {stopContainer}/>
          <img src = {restartContainer}/>
        </div>
      </div>
    </div> */}
      
    <NavBar />
    <div className='dashbaordData'>
    <div className='dashbaord-header'>Containers</div>

    {/* Active Containers */}
    <div className="card2">
    <div className='dnd-board'>
          {/* <!-- Card header --> */}
          <div className="card-header">
            {/* <!-- Title --> */}
            <div className="each-container">Please drag your container here to</div>
          </div>
          {/* <!-- Card body --> */}
          <div className="card-body">
            {/* <!-- Chart wrapper --> */}
            <TrashCan/>
          </div>
        </div>
    </div>

        {/* Active Containers */}
        <div className="card2">
    <div className='dnd-board'>
          {/* <!-- Card header --> */}
          <div className="card-header">
            {/* <!-- Title --> */}
            <div className="each-container">Active Containers</div>
          </div>
          {/* <!-- Card body --> */}
          <div className="card-body">
            {/* <!-- Chart wrapper --> */}
            <DndContainers listOfContainers={data}/>
          </div>
        </div>
    </div>


   



    </div>
    </div>
  )
}

export default withAuth(ContainersContainer);

// Do I need this??? this is probably addressed in the app.js
// export default DragDropContext(withAuth)(ContainersContainer);
// export default DragDropContext(ContainersContainer);

