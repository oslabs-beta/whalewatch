import React from "react";
import { useState, useEffect } from 'react';
//reimplement withauth
import { withAuth } from "../withAuth";
import WhaleChart from "../components/dashboard/WhaleChart";
import AverageCPUChart from "../components/dashboard/AverageCPUChart";
import AverageMemoryChart from "../components/dashboard/AverageMemoryChart";
import NetIOChart from "../components/dashboard/NetIOChart";
import BlockIOChart from "../components/dashboard/BlockIOChart";
import { useQuery, gql } from '@apollo/client';
import NavBar from "../components/NavBar/NavBar";
import PIDChart from "../components/dashboard/PIDChart";

const GET_CONTAINERS = gql`
    query containers {
    container {
      id
      dockerid
      name
      size
      status
      stats {
        timestamp
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

  const populateChart = (datatype, data) => {
    const array = data.container;
    const dataArr = [];
    const dataCache = {};

    array.forEach(container => {
      const stats = container.stats;
      stats.forEach(stat => {
        if (!dataCache[stat.timestamp]) {
          dataCache[stat.timestamp] = [];
        }
        dataCache[stat.timestamp].push(stat[datatype]);
      })
    })
    Object.keys(dataCache).forEach(time => {
      let total = 0;
      dataCache[time].forEach(entry => total += entry);
      const avg = total / dataCache[time].length;
      let timestamp = Number(time);
      timestamp = new Date(timestamp)
      dataArr.push({ timestamp: timestamp.getDate(), datatype: avg.toFixed(2) });
    })
    dataArr.sort((a, b) => a.timestamp - b.timestamp)
    return dataArr;
  }


  return (
    <div className='dashbaordContainer'>
      <NavBar />
      <div className='dashbaordData'>
        <div className='dashbaord-header'>Dashboard</div>
        <div>
          <div className='whaleChartContainer'>
            <WhaleChart listOfContainers={data} />
          </div>
        </div>
        <div>
          {/* the below need to be passed the appropriate stats */}
          <AverageCPUChart data={data} populateChart={populateChart} />
          <AverageMemoryChart data={data} populateChart={populateChart} />
          <NetIOChart data={data} populateChart={populateChart} />
          <BlockIOChart data={data} populateChart={populateChart} />
          <PIDChart data={data} populateChart={populateChart} />
        </div>
      </div>
    </div>
  )
}

export default withAuth(DashboardContainer)

