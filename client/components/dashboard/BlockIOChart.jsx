import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

const BlockIOChart = ({ data }) => {
  //stats will be received from the container
  const array = data.container;
  const blockIOArr = [];
  array.forEach(container => {
    const stats = container.stats;
    stats.forEach(stat => {
      blockIOArr.push(stat.blockio);
    })
  })
  let total = 0;
  blockIOArr.forEach(usage => total += usage);
  const avg = (total / blockIOArr.length).toFixed(2);

  return (
    <>
      <h3>Average Block I/O</h3>

      <p>Average block IO: {avg}</p>
    </>
  )

}

export default BlockIOChart;