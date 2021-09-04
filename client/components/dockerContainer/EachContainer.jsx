import React from "react";
import whaleBlue from "../../assets/whaleBlue.png"
import whaleRed from "../../assets/whaleRed.png"
import { useDrag } from 'react-dnd'
// import {ItemTypes} from './ItemTypess'

const EachContainer = ({info}) => {
 console.log(info)
    //for dragging
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { info },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                console.log('yaya')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));

    // const [{ isDragging }, drag] = useDrag({
    //     type: "image",
    //     item: {info},
    //     collect: monitor => ({
    //       isDragging: monitor.isDragging()
    //     })
    //   });

    // const [{isDragging}, drag] = useDrag({
    //   item: {
    //     type: ItemTypes.CONTAINER,
    //     id: props.ingredient.id,
    //     ingredient: props.ingredient
    //   },
    //   collect: monitor => ({
    //     isDragging: !!monitor.isDragging()
    //   })
    // })
    
      const opacity = isDragging ? 0 : 1;

    return (
        <div className="whale-display">
        {info.status !== 'Bad' ? <img ref={drag} src={whaleBlue} className="whale" style={{opacity}}/> : <img src={whaleRed} ref={drag} className="whale" style={{opacity}} />}

        {/* <br />Container {info.name}  <br />{info.size} MB */}
   
  
  
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