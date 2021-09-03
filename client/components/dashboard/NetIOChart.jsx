import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import formatBytes from "../../containers/containerHelpers";

const NetIOChart = ({ data }) => {
  //stats will be received from the container

  // const dataArr = populateBarChart('netio', data, 'received', 'sent');
  const arr = data.container;
  const dataArr = [];
  const dataCache = {};
  arr.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      if (!dataCache[stat.timestamp]) {
        dataCache[stat.timestamp] = [];
      }
      dataCache[stat.timestamp].push(stat.netio);
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
    const avgIn = totalIn / inputArr.length;
    const newavgIn = isNaN(avgIn) ? 0 : formatBytes(avgIn);
    let avgOut = totalOut / outputArr.length;
    const newavgOut = isNaN(avgOut) ? 0 : formatBytes(avgOut);
    let timestamp = Number(time);
    timestamp = new Date(timestamp)
    dataArr.push({ name: timestamp.getDate(), received: newavgIn, sent: newavgOut })
  })
  dataArr.sort((a, b) => a.timestamp - b.timestamp)

  return (
    <>
      {/* <h3>Average Net I/O</h3> */}
      <BarChart width={600} height={300} data={dataArr}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="received" fill="#8884d8" />
        <Bar dataKey="sent" fill="#82ca9d" />
      </BarChart>
    </>
  )

}

export default NetIOChart;