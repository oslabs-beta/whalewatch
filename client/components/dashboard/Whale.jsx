import React from "react";
import whaleBlue from "../../assets/whaleBlue.png"
import whaleRed from "../../assets/whaleRed.png"
import { useDrag } from "react-dnd";

const Whale = ({ info }) => {


  //use-drag hook from DnD
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image", //type can be a div if you want
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }));

  return (
    // put appropriate stuff here
    <div className="whale-display">
      {info.status !== 'unhealthy' ? <img ref={drag} src={whaleBlue} className="whale" style={{ border: isDragging ? "5px solid pink" : "0px" }} /> : <img src={whaleRed} ref={drag} className="whale" style={{ border: isDragging ? "5px solid pink" : "0px" }} />}
      {/* <img ref={drag} src={whaleBlue} className="whale" style={{border: isDragging? "5px solid pink" : "0px"}}/>  */}
      <br />Container {info.name}  <br />{info.size}
    </div>

  )
}

export default Whale;