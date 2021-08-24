import React from "react";
import whaleBlue from "../../assets/whaleBlue.png"

const Whale = ({ info }) => {
  //each whale will represent a container
  //health status will indicate a css class to have different colors
  //should they include names?
  return (
    // put appropriate stuff here
    <p><img src={whaleBlue} />My name is {info.name}</p>
  )
}

export default Whale;