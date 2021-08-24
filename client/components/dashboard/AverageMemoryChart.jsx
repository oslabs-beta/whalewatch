import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

const AverageMemoryChart = ({ data }) => {
  //stats will be received from the container
  const array = data.container;
  const memUsageArr = [];
  array.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      memUsageArr.push(stat.memusage);
    })
  })
  let total = 0;
  memUsageArr.forEach(usage => total += usage);
  const avg = (total / memUsageArr.length).toFixed(2);
  return (
    <>
      <h3>Average Memory Usage</h3>
      <p>Here is the average cpu usage: {avg}</p>
    </>
  )

}

export default AverageMemoryChart;