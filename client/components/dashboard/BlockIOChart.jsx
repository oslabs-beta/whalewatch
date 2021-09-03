import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import formatBytes from "../../containers/containerHelpers";

const BlockIOChart = ({ data }) => {
  //stats will be received from the container

  // const dataArr = populateBarChart('blockio', data, 'read', 'written');
  // console.log('block IO data', dataArr)

  //function to parse data for the bar charts
  const arr = data.container;
  const dataArr = [];
  const dataCache = {};
  arr.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      if (!dataCache[stat.timestamp]) {
        dataCache[stat.timestamp] = [];
      }
      dataCache[stat.timestamp].push(stat.blockio);
    })
  })
  Object.keys(dataCache).forEach(time => {
    const timeArr = dataCache[time];
    const inputArr = [];
    const outputArr = [];
    timeArr.forEach(el => {
      const idx = el.indexOf('B');
      inputArr.push(el.slice(0, idx));
      outputArr.push(el.slice(idx + 4, -1))
    })
    const totalIn = inputArr.reduce((a, c) => a + c)
    const totalOut = outputArr.reduce((a, c) => a + c)
    let avgIn = totalIn / inputArr.length;
    avgIn = isNaN(avgIn) ? 0 : formatBytes(avgIn);
    let avgOut = totalOut / outputArr.length;
    avgOut = isNaN(avgOut) ? 0 : formatBytes(avgOut);
    let timestamp = Number(time);
    timestamp = new Date(timestamp)
    dataArr.push({ name: timestamp.getDate(), read: avgIn, written: avgOut })
  })
  dataArr.sort((a, b) => a.timestamp - b.timestamp)



  return (
    <>
      {/* <h3>Average Block I/O</h3> */}

      <BarChart width={600} height={300} data={dataArr}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="read" fill="#8884d8" />
        <Bar dataKey="written" fill="#82ca9d" />
      </BarChart>
    </>
  )

}

export default BlockIOChart;