import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


const PIDChart = ({ data, populateChart }) => {

  const dataArr = populateChart('pids', data);
  
  return (
    <>
      <LineChart width={600} height={300} data={dataArr} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="datatype" stroke="#149ce4" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="timestamp" />
        <YAxis height="1000" />
        <Tooltip />
      </LineChart>
    </>
  )
}

export default PIDChart;