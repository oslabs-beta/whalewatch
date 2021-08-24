import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const AverageMemoryChart = ({ data }) => {
  //stats will be received from the container
  const array = data.container;
  const memUsageArr = [];
  const dataCache = {};
  array.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      if (!dataCache[stat.timestamp]) {
        dataCache[stat.timestamp] = [];
      }
      dataCache[stat.timestamp].push(stat.memusage);
    })
  })

  Object.keys(dataCache).forEach(time => {
    let total = 0;
    dataCache[time].forEach(entry => total += entry);
    const avg = total / dataCache[time].length;
    let timestamp = Number(time);
    timestamp = new Date(timestamp)
    memUsageArr.push({ timestamp: timestamp.getDate(), memusage: avg.toFixed(2) });
  })
  memUsageArr.sort((a, b) => a.timestamp - b.timestamp)


  return (
    <>
      <h3>Average Memory Usage</h3>
      <LineChart width={600} height={300} data={memUsageArr} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="memusage" stroke="#149ce4" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  )

}

export default AverageMemoryChart;