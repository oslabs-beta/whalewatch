import React from "react";
import { useDrag } from 'react-dnd'


const EachContainer = ({info, handleDrop}) => {
  //for dragging
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: {info: info.dockerid, state: info.state },
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0 : 1;

  return (
      <div id="containersList" ref={drag} style={{opacity}}> 
      Name: {info.name}<br/> Docker ID: {info.dockerid.slice(0, 12)}<br/>Status: {info.status}<br/> Container Size:{info.size}

      </div>



  )
}

export default EachContainer;