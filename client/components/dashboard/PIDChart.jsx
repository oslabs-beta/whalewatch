import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

const PIDChart = ({ data }) => {
  //stats will be received from the container
  const array = data.container;
  const PIDArr = [];
  array.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      PIDArr.push(stat.pids);
    })
  })
  let total = 0;
  PIDArr.forEach(usage => total += usage);
  const avg = (total / PIDArr.length).toFixed(2);

  return (
    <>
      <h3>Average PIDs</h3>

      <p>Average PIDs: {avg}</p>
    </>
  )

}

export default PIDChart;