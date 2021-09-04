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

function TrashCan() {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'image',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
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