import React from 'react';
import { useDrop } from 'react-dnd';
import stop from '../../assets/stop.png'
import restart from '../../assets/restart.png'

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


function Stop({containerData, handleDrop}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'image',
        drop: (item) => {
            console.log('This is the item', item)
            console.log('We are stopping on stop button')
            handleDrop(containerData.filter(container=> container.id !== item.info))
          },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
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
    return (
    <div>
    <img src={stop} ref={drop} role={'Dustbin'} style={{...style, backgroundColor}}/>
    {isActive ? 'Release to disactive your container' : 'Drag a container'}
    </div>
    )
}

export default Stop;
