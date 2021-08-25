import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const AverageCPUChart = ({ data }) => {
  const array = data.container;
  const cpuUsageArr = [];
  const dataCache = {};
  array.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      if (!dataCache[stat.timestamp]) {
        dataCache[stat.timestamp] = [];
      }
      dataCache[stat.timestamp].push(stat.cpuusage);
    })
  })
  Object.keys(dataCache).forEach(time => {
    let total = 0;
    dataCache[time].forEach(entry => total += entry);
    const avg = total / dataCache[time].length;
    let timestamp = Number(time);
    timestamp = new Date(timestamp)
    cpuUsageArr.push({ timestamp: timestamp.getDate(), cpuusage: avg.toFixed(2) });
  })
  cpuUsageArr.sort((a, b) => a.timestamp - b.timestamp)



  return (
    <>
      <h3>Average CPU Usage</h3>
      <LineChart width={600} height={300} data={cpuUsageArr} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="cpuusage" stroke="#149ce4" />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  )

}

export default AverageCPUChart;