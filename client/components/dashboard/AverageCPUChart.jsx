import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

//likely importing some kind of graphing library pieces here

const AverageCPUChart = ({ data }) => {
  const array = data.container;
  const cpuUsageArr = [];
  array.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      cpuUsageArr.push(stat.cpuusage);
    })
  })
  let total = 0;
  cpuUsageArr.forEach(usage => total += usage);
  const avg = (total / cpuUsageArr.length).toFixed(2);


  return (
    <>
      <h3>Average CPU Usage</h3>
      <p>Here is the average cpu usage: {avg}</p>
    </>
  )

}

export default AverageCPUChart;