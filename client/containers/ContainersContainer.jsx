import React, { useState, useEffect} from 'react';
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql, useLazyQuery} from '@apollo/client';
import Cookies from 'js-cookie';
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
  
  const variables = { id: parseInt(localStorage.getItem('validId')) };
  const { loading, error, data, refetch } = useQuery(GET_CONTAINERS, {variables})
  const [containerData, setContainerData] = useState([])

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
              {loading ? <div>Loading...</div> : <DndContainers listOfContainers={data.container} state={'running'} refetch={refetch}/>}
            </div>
          </div>
        </div>


        <div className="restart-stop">
          <div><Stop containerData={containerData} refetch={refetch} /></div>
          <div><Restart containerData={containerData} refetch={refetch} /></div>
        </div> 

        {/* InActive Containers */}
         <div className="card2">
          <div className='dnd-board'>
            {/* <!-- Card header --> */}
            <div className="card-header">
              {/* <!-- Title --> */}
              <div className="metric-type">Inactive Containers</div>
            </div>
            {/* <!-- Card body --> */}
            <div className="card-body">
              {loading ? <div>Loading...</div> : <DndContainers listOfContainers={data.container} state={'exited'} refetch={refetch} /> }
            </div>
            
          </div>
        </div>

        </div>
      </div>

  )
}

export default ContainersContainer;

