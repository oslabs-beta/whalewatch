import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Whale from "./Whale";


const WhaleChart = ({ listOfContainers }) => {

  const list = listOfContainers.container
  const whales = [];
  list.map(container => {
    whales.push(<Whale key={container.id} info={container} />);
  });

  return (
    <div id="container-list-dnd">
      {whales}

    </div>
  )
}

export default WhaleChart;