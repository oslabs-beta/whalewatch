import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql, useLazyQuery} from '@apollo/client';

import AuthApi from '../Context.js'
import Cookies from 'js-cookie';
import Auth from "../Auth.js";

import deleteContainer from "../assets/delete.png";
import stopContainer from "../assets/stop.png";
import restartContainer from "../assets/restart.png";
import DndContainers from "../components/dockerContainer/DndContainers"
import Stop from "../components/dockerContainer/Stop"
import Restart from '../components/dockerContainer/Restart'

const GET_CONTAINERS = gql`
query Containers ($id: Int) {
  container(id: $id) {
    id
    dockerid
    name
    size
    state
    status
  }
}
`;


const ContainersContainer = ({validId}) => {
  
  const Auth = React.useContext(AuthApi);
  const variables = { id: parseInt(localStorage.getItem('validId')) };
  const { loading, data, error } = useQuery(GET_CONTAINERS, {variables})
  const [containerData, setContainerData] = useState([])

  useEffect(() => {
  // do some checking here to ensure data exist
  if (data) {
    setContainerData(data.container)
  }
  }, [data])
  
  const handleDrop = (newValue) => {
    setContainerData(newValue)
  }

  return (
    <div className='dashbaordContainer'>
      <NavBar />
      <div className='dashbaordData'>
        <div className='dashbaord-header'>Containers</div>


        {/* Active Containers */}
        <div className="card2">
          <div className='dnd-board'>
            {/* <!-- Card header --> */}
            <div className="card-header">
              {/* <!-- Title --> */}
              <div className="metric-type">Active Containers</div>
            </div>
            {/* <!-- Card body --> */}
            <div className="card-body">
              <DndContainers listOfContainers={containerData} handleDrop={handleDrop} state={'running'} />
            </div>
            
          </div>
        </div>


            <div className="restart-stop">
              <Stop containerData={containerData} handleDrop={handleDrop} />
              <Restart containerData={containerData} handleDrop={handleDrop} />
            </div>

        {/* InActive Containers */}
         <div className="card2">
          <div className='dnd-board'>
            {/* <!-- Card header --> */}
            <div className="card-header">
              {/* <!-- Title --> */}
              <div className="each-container">Inactive Containers</div>
            </div>
            {/* <!-- Card body --> */}
            <div className="card-body">
              <DndContainers listOfContainers={containerData} handleDrop={handleDrop} state={'exited'} />
            </div>
            
          </div>
        </div>


      </div>
    </div>
  )
}

export default ContainersContainer;

