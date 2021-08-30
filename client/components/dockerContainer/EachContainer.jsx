import React from "react";
import { withAuth } from "../../withAuth";
import whaleBlue from "../../assets/whaleBlue.png"
import whaleRed from "../../assets/whaleRed.png"
import { useDrag } from 'react-dnd'

const EachContainer = ({info}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { info },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                console.log('yes')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const opacity = isDragging ? 0 : 1;
    return (
        <div className="whale-display">
        {info.status !== 'Bad' ? <img ref={drag} src={whaleBlue} className="whale" style={{border: isDragging? "5px solid pink" : "0px"}}/> : <img src={whaleRed} ref={drag} className="whale" style={{border: isDragging? "5px solid pink" : "0px"}} />}
  
        <br />Container {info.name}  <br />{info.size} MB
   
  
  
      </div>

// return (
//     <div className='container-display'>
//         <p>{info.id}</p>
//         {/* {info.size}
//         {info.status}
//         {info.dockerid} */}
//     </div>
// )
    )
}

export default EachContainer;