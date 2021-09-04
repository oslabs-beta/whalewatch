import React from 'react';
import { useDrop } from 'react-dnd';

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};


// const TrashCan = ({containerData}) => {
//     const [{isOver, canDrop}, drop] = useDrop({
//         accept: 'image',
//         drop: (monitor) => {
//             onDrop(containerData);
//           },
//         canDrop: (monitor) => { 
//           return true;  
//          },
//         collect: (item,monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         })
//     });
//     const isActive = isOver && canDrop;
//     let backgroundColor = '#222';
//     if (isActive) {
//         backgroundColor = 'darkgreen';
//     }
//     else if (canDrop) {
//         backgroundColor = 'darkkhaki';
//     }
//     return (<div ref={drop} role={'Dustbin'} style={{...style, backgroundColor}}>
//     {isActive ? 'Release to disactive your container' : 'Drag a cotainer'}
//     </div>
//     )
// }


function TrashCan({containerData, handleDrop}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'image',
        drop: (item, monitor) => {
            handleDrop(containerData, item);
          },
        canDrop: (item, monitor) => {
            return true;
          },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = canDrop && isOver;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return (<div ref={drop} role={'Dustbin'} style={{...style, backgroundColor}}>
    {isActive ? 'Release to disactive your container' : 'Drag a cotainer'}
    </div>
    )
}

export default TrashCan;
