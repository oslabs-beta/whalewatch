import React from "react";
import whaleBlue from "../../assets/whaleBlue.png"
import whaleRed from "../../assets/whaleRed.png"
import { useDrag } from 'react-dnd'
// import {ItemTypes} from './ItemTypess'

const EachContainer = ({info, handleDrop}) => {
    //for dragging
    const [{ isDragging }, drag] = useDrag(() => ({

        type: "image",
        item: {info: info.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    
    const opacity = isDragging ? 0 : 1;

    return (
        <div className="whale-display">
        {info.status !== 'Bad' ? <img ref={drag} src={whaleBlue} className="whale" style={{opacity}}/> : <img src={whaleRed} ref={drag} className="whale" style={{opacity}} />}

        {/* <br />Container {info.name}  <br />{info.size} MB */}
        </div>

    )
}

export default EachContainer;