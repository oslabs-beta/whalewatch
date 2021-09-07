import React from 'react';
import { useDrop } from 'react-dnd';
import stop from '../../assets/stop.png'
import restart from '../../assets/restart.png'

const style = {
    height: '5rem',
    width: '5rem',

    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};


function Restart({containerData, handleDrop}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'image',
        drop: (item) => {
            console.log('This is the item', item)
            console.log('We are restarting on restart button')
            handleDrop(containerData.filter(container=> container.id !== item.info))
          },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
 
    const isActive = canDrop && isOver;
    let backgroundColor = '#ffffff';
    if (isActive) {
        backgroundColor = '#ffffff';
    }
    else if (canDrop) {
        backgroundColor = '#ffffff';
    }
    return (
    <div>
    <img src={restart} ref={drop} role={'restart'} style={{...style, backgroundColor}}/>
    {isActive ? 'Release to disactive your container' : 'Drag a container'}
    </div>
    )
}

export default Restart;
