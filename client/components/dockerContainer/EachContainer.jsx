import React from "react";
import whaleBlue from "../../assets/whaleBlue.png"
import whaleRed from "../../assets/whaleRed.png"
import { useDrag } from 'react-dnd'
// import {ItemTypes} from './ItemTypess'

const EachContainer = ({info, handleDrop}) => {
    //for dragging
    const [{ isDragging }, drag] = useDrag(() => ({

        type: "image",
        item: {info: info.dockerid },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    
    const opacity = isDragging ? 0 : 1;

    return (
    

        
        <div id="containersList" ref={drag} style={{opacity}}> 
        Name: {info.name}<br/> Docker ID: {info.dockerid}<br/>Status: {info.status}<br/> Container Size:{info.size}

        </div>



    )
}

export default EachContainer;