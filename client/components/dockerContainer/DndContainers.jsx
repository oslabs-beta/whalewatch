import React from 'react'
import EachContainer from './EachContainer';
// import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd'


const DndContainers = ({listOfContainers, handleDrop}) => {
    const list = listOfContainers.container
    const activateContainer = [];
    list.map(container => {
        activateContainer.push(<EachContainer key={container.id} info={container} handleDrop={handleDrop}/>);
    });

    return (
        <div className='container' >
            {activateContainer}
        </div>
    )
}

export default DndContainers;
