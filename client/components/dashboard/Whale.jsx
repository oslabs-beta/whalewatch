import React from "react";
import whaleBlue from "../../assets/whaleBlue.png"
import whaleRed from "../../assets/whaleRed.png"
import { useDrag } from "react-dnd";

//each container that is on the user's computer is represented by a whale
const Whale = ({ info }) => {

  //use-drag hook from DnD
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image", //type can be a div if you want
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return (
    <div className="whale-display">
      {/* whale color is determined by whether the container is healthy or unhealthy */}
      {info.status !== 'unhealthy' ? <img ref={drag} src={whaleBlue} className="whale" style={{ border: isDragging ? "5px solid pink" : "0px" }} /> : <img src={whaleRed} ref={drag} className="whale" style={{ border: isDragging ? "5px solid pink" : "0px" }} />}
      <br />Container {info.name}  <br />{info.size}
    </div>
  )
}

export default Whale;