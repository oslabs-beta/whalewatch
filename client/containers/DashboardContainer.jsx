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
    container(id:10) {
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
  const { userId } = props;
  const [listOfContainers, setListOfContainers] = useState([]);

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

        {/* Whale Chart */}
        <div className="card1">
          {/* <!-- Card header --> */}
          <div className="card-header">
            {/* <!-- Title --> */}
            <div className="metric-type">Container Health Overview</div>
          </div>
          {/* <!-- Card body --> */}
          <div className="card-body">
            {/* <!-- Chart wrapper --> */}
            <WhaleChart className='whalechart' listOfContainers={data} />
          </div>
        </div>

        {/* AverageCPUChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average CPU Usage</div>
          </div>
          <div className="card-body">
            <AverageCPUChart data={data} populateChart={populateChart} />
          </div>
        </div>

        {/* AverageMemoryChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average Memory Usage</div>
          </div>
          <div className="card-body">
            <AverageMemoryChart data={data} populateChart={populateChart} />
          </div>
        </div>

        {/* Average Net I/O */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average Net I/O</div>
          </div>
          <div className="card-body">
            <NetIOChart data={data} populateChart={populateChart} />
          </div>
        </div>

        {/* BlockIOChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average Block I/O</div>
          </div>
          <div className="card-body">
            <BlockIOChart data={data} populateChart={populateChart} />
          </div>
        </div>

        {/* PIDChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average PIDs</div>
          </div>
          <div className="card-body">
            <PIDChart data={data} populateChart={populateChart} />
          </div>
        </div>




        {/* the below need to be passed the appropriate stats */}
        {/* <AverageCPUChart data={data} populateChart={populateChart} /> */}
        {/* <AverageMemoryChart data={data} populateChart={populateChart} /> */}
        {/* <NetIOChart data={data} populateChart={populateChart} /> */}
        {/* <BlockIOChart data={data} populateChart={populateChart} />
          <PIDChart data={data} populateChart={populateChart} /> */}


      </div>
    </div>
  )
}

export default withAuth(DashboardContainer)

