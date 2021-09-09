import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useState, useEffect} from 'react';
import WhaleChart from "../components/dashboard/WhaleChart";
import AverageCPUChart from "../components/dashboard/AverageCPUChart";
import AverageMemoryChart from "../components/dashboard/AverageMemoryChart";
import NetIOChart from "../components/dashboard/NetIOChart";
import BlockIOChart from "../components/dashboard/BlockIOChart";
import { useQuery, gql } from '@apollo/client';
import NavBar from "../components/NavBar/NavBar";
import PIDChart from "../components/dashboard/PIDChart";
import Cookies from 'js-cookie';
import formatBytes from "./containerHelpers";

//get containers is a query that requests container data from our GraphQL endpoint
const GET_CONTAINERS = gql`
    query Containers ($id: Int) {
      container(id: $id) {
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

function forceRerender(){
  const [forceRerender, setForceRerender] = useState(0);
  return () => setForceRerender(forceRerender => forceRerender + 1)
}

const DashboardContainer = ({ validId }) => {
  const reRender = forceRerender();
  //currently, user id is held in local storage
  const variables = { id: Number(localStorage.getItem('validId')) };
  //we are using Apollo useQuery hooks to fetch the data
  const { loading, error, data } = useQuery(GET_CONTAINERS, { variables });
  if (error) return `Error! ${error.message}`;

  /*
  function to parse the data for the line charts
    inputs: datatype string, data object from graphql
    output: an array of data, formatted properly for recharts
  */
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


  /*function to parse data for the bar charts
    inputs: datatype string, data object from graphql
    output: an array of data, formatted properly for recharts
    in future, I'd like to refactor this to be more dry (one chart func with helper funcs)
  */
  const populateBarChart = (datatype, data) => {
    const arr = data.container;
    const dataArr = [];
    const dataCache = {};

    arr.forEach(container => {
      const stats = container.stats;
      stats.forEach(stat => {
        if (!dataCache[stat.timestamp]) {
          dataCache[stat.timestamp] = [];
        }
        dataCache[stat.timestamp].push(stat[datatype]);
      })
    })

    Object.keys(dataCache).forEach(time => {
      const timeArr = dataCache[time];
      const inputArr = [];
      const outputArr = [];
      timeArr.forEach(el => {
        const idx = el.indexOf('B');
        inputArr.push(el.slice(0, idx));
        const out = el.slice(idx + 4, -1)
        outputArr.push(out === '' ? '0' : out)
      })
      const totalIn = inputArr.reduce((a, c) => Number(a) + Number(c))

      const totalOut = outputArr.reduce((a, c) => Number(a) + Number(c))

      let avgIn = totalIn / inputArr.length;
      avgIn = isNaN(avgIn) ? 0 : formatBytes(avgIn);
      let avgOut = totalOut / outputArr.length;
      avgOut = isNaN(avgOut) ? 0 : formatBytes(avgOut);
      let timestamp = Number(time);
      timestamp = new Date(timestamp)
      dataArr.push({ name: timestamp.getDate(), in: avgIn, out: avgOut })
    })
    dataArr.sort((a, b) => a.name - b.name)
    return dataArr;
  }



  return (
    <div className='dashbaordContainer'>
      <NavBar />
      <div className='dashbaordData'>
        <div className='dashbaord-header'>
          <p>Dashboard</p>
        </div>

        {/* Whale Chart */}
        <div className="card1">
          {/* <!-- Card header --> */}
          <div className="card-header">
            {/* <!-- Title --> */}
            <div className="metric-type">Container Health Overview </div>
            <button className = 'refresh-button' onClick = {reRender}>Refresh</button>
          </div>

          {/* <!-- Card body --> */}
          <div className="card-body">
            {/* <!-- Chart wrapper --> */}
            {loading ? <div>Loading...</div> : <WhaleChart className='whalechart' listOfContainers={data} />}
          </div>
        </div>

        {/* AverageCPUChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average CPU Usage</div>
          </div>
          <div className="card-body">
            {loading ? <div>Loading...</div> : <AverageCPUChart data={data} populateChart={populateChart} />}
          </div>
        </div>

        {/* AverageMemoryChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average Memory Usage </div>
          </div>
          <div className="card-body">
            {loading ? <div>Loading...</div> : <AverageMemoryChart data={data} populateChart={populateChart} />}
          </div>
        </div>

        {/* Average Net I/O */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average Net I/O</div>
          </div>
          <div className="card-body">
            {loading ? <div>Loading...</div> : <NetIOChart data={data} populateBarChart={populateBarChart} />}
          </div>
        </div>

        {/* BlockIOChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average Block I/O</div>
          </div>
          <div className="card-body">
            {loading ? <div>Loading...</div> : <BlockIOChart data={data} populateBarChart={populateBarChart} />}
          </div>
        </div>

        {/* PIDChart */}
        <div className="card1">
          <div className="card-header">
            <div className="metric-type">Average PIDs</div>
          </div>
          <div className="card-body">
            {loading ? <div>Loading...</div> : <PIDChart data={data} populateChart={populateChart} />}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardContainer

