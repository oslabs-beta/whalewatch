import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Whale from "./Whale";

const WhaleChart = ({ listOfContainers }) => {
  //we will need to pull in from props a list of containers
  //then the whale chart will render whales based on that list
  const whales = [];
  listOfContainers.map(container => {
    whales.push(<Whale info={container} />);
  });

  return (
    { whales }
  )
}

export default WhaleChart;