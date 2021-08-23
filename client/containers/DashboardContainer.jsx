import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import WhaleChart from "../components/dashboard/WhaleChart";
import AverageCPUChart from "../components/dashboard/AverageCPUChart";
import AverageMemoryChart from "../components/dashboard/AverageMemoryChart";
import NetIOChart from "../components/dashboard/NetIOChart";
import { useQuery, gql } from '@apollo/client';

//complete this query
// const GET_CONTAINERS = gql`
//   query GetContainers() {

//   }
// `;
// //complete this query
// const GET_STATS = gql`
//   query GetContainers() {

//   }
// `;

const DashboardContainer = (props) => {

  const [listOfContainers, setListOfContainers] = useState([]);
  //this piece of state will hold the stats we'll use to make the chart
  // const [stats, setStats] = useState({
  //   cpuUsage: '',
  //   memUsage: '',
  //   netIO: ''
  // })

  //functionality to grab list of containers here
  // const getContainers = useQuery(GET_CONTAINERS, {
  //   onCompleted: (data) => {
  //     setListOfContainers(data);
  //   }
  // })

  //functionality to grab stats here
  // const getStats = useQuery(GET_STATS, {
  //   //use list of containers to get the appropriate stats
  //   // variables: id,
  //   onCompleted: (data) => {
  //     setStats({ ...stats, cpuUsage: data.cpuUsage, memUsage: data.memUsage, netIO: data.netIO });
  //   }
  // })

  //invoke get containers and get stats

  //functionality to update stats state on click to represent just one container should go here and get passed to Whale Chart
  // const clickWhale = (e) => {
  //   const id = e.target.id;
  //   //invoke get stats but just using the one whale id
  // }


  return (
    <>
      {/* render navbar here */}
      <div>
        <WhaleChart listOfContainers={listOfContainers} clickWhale={clickWhale} />
      </div>
      <div>
        {/* the below need to be passed the appropriate stats */}
        <AverageCPUChart />
        <AverageMemoryChart />
        <NetIOChart />
      </div>
    </>
  )

}

export default withAuth(DashboardContainer)