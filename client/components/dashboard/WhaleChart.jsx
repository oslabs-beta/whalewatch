import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Whale from "./Whale";


const WhaleChart = ({ listOfContainers }) => {
  //we will need to pull in from props a list of containers
  //then the whale chart will render whales based on that list
  const list = listOfContainers.container
  const whales = [];
  list.map(container => {
    whales.push(<Whale key={container.id} info={container} />);
  });

  return (
    <div id="whale-chart">
      {whales}
    </div>
  )
}

export default WhaleChart;