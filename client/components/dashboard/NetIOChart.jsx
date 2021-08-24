import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

const NetIOChart = ({ data }) => {
  //stats will be received from the container
  const array = data.container;
  const netIOArr = [];
  array.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      netIOArr.push(stat.netio);
    })
  })
  let total = 0;
  netIOArr.forEach(usage => total += usage);
  const avg = (total / netIOArr.length).toFixed(2);

  return (
    <>
      <h3>Average Net I/O</h3>

      <p>Average net IO: {avg}</p>
    </>
  )

}

export default NetIOChart;