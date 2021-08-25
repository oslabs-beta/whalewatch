import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const AverageCPUChart = ({ data, populateChart }) => {

  const dataArr = populateChart('cpuusage', data);



  return (
    <>
      <h3>Average CPU Usage</h3>
      <LineChart width={600} height={300} data={dataArr} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="datatype" stroke="#149ce4" />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  )

}

export default AverageCPUChart;