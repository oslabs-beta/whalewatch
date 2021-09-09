import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import formatBytes from "../../containers/containerHelpers";

const BlockIOChart = ({ data, populateBarChart }) => {
  //stats will be received from the container

  const dataArr = populateBarChart('blockio', data);
  
  return (
    <>
      {/* <h3>Average Block I/O</h3> */}

      <BarChart width={600} height={300} data={dataArr}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="in" fill="#8884d8" />
        <Bar dataKey="out" fill="#82ca9d" />
      </BarChart>
    </>
  )
}

export default BlockIOChart;