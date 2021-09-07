import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql } from '@apollo/client';

import AuthApi from '../Context.js'
import Cookies from 'js-cookie';
import Auth from "../Auth.js";

import deleteContainer from "../assets/delete.png";
import stopContainer from "../assets/stop.png";
import restartContainer from "../assets/restart.png";
import DndContainers from "../components/dockerContainer/DndContainers"
import TrashCan from "../components/dockerContainer/TrashCan"

const GET_CONTAINERS = gql`
query Containers ($id: Int) {
  container(id: $id) {
    id
    dockerid
    name
    size
    status
  }
}
`;


const ContainersContainer = ({validId}) => {
  const fakeData =
    [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
    ]

  // const [containerData, setContainerData] = useState(fakeData)

  //   const GET_CONTAINERS = gql`
  //   query containers {
  //     container(id:10) {
  //       id
  //       dockerid
  //       name
  //       size
  //       status
  //     }
  //   }
  // `;
  const Auth = React.useContext(AuthApi);
  const variables = { id: parseInt(localStorage.getItem('validId')) };

  const [containerData, setContainerData] = useState([])
  useEffect(() => {
    const { loading, error, data } = useQuery(GET_CONTAINERS, { variables });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)
  })

  
  
  const handleDrop = (newValue) => {
    setContainerData(newValue)
  }

  return (
    <div className='dashbaordContainer'>


      <NavBar />
      <div className='dashbaordData'>
        <div className='dashbaord-header'>Containers</div>

        {/* test */}
        <DndContainers listOfContainers={containerData} handleDrop={handleDrop} />


        {/* Active Containers */}
        <div className="card2">
          <div className='dnd-board'>
            {/* <!-- Card header --> */}
            <div className="card-header">
              {/* <!-- Title --> */}
              <div className="each-container">Please drag your container here</div>
            </div>
            {/* <!-- Card body --> */}
            <div className="card-body">
              {/* <!-- Chart wrapper --> */}
              <TrashCan containerData={containerData} handleDrop={handleDrop} />
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
              {/* <DndContainers listOfContainers={data}/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContainersContainer;

