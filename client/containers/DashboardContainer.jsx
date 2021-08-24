import React from "react";
import { useState, useEffect } from 'react';
//reimplement withauth
// import { withAuth } from "../withAuth";
import WhaleChart from "../components/dashboard/WhaleChart";
import AverageCPUChart from "../components/dashboard/AverageCPUChart";
import AverageMemoryChart from "../components/dashboard/AverageMemoryChart";
import NetIOChart from "../components/dashboard/NetIOChart";
import BlockIOChart from "../components/dashboard/BlockIOChart";
import { useQuery, gql } from '@apollo/client';
import NavBar from "../components/NavBar/NavBar";
<<<<<<< HEAD
=======
import PIDChart from "../components/dashboard/PIDChart";
>>>>>>> dev

const GET_CONTAINERS = gql`
    query containers {
    container {
      id
      dockerid
      name
      size
      status
      stats {
        cpuusage
        memusage
        netio
        blockio
        pids
        reqpermin
      }
    }
  }
  
`;


const DashboardContainer = (props) => {

  const [listOfContainers, setListOfContainers] = useState([]);
  //this piece of state will hold the stats we'll use to make the chart
  // const [stats, setStats] = useState({
  //   cpuUsage: '',
  //   memUsage: '',
  //   netIO: ''
  // })

  const { loading, error, data } = useQuery(GET_CONTAINERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)


  return (
<<<<<<< HEAD
    <>
      {/* render navbar here */}
      <NavBar/>
=======
    <div className='dashbaordContainer'>
      <NavBar />
>>>>>>> dev
      <div>
        <WhaleChart listOfContainers={data} />
      </div>
      <div>
        {/* the below need to be passed the appropriate stats */}
        <AverageCPUChart data={data} />
        <AverageMemoryChart data={data} />
        <NetIOChart data={data} />
        <BlockIOChart data={data} />
        <PIDChart data={data} />
      </div>
    </div>
  )
}

export default DashboardContainer

