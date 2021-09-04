import React from 'react'
import EachContainer from './EachContainer';
import { useDrag } from 'react-dnd'


const DndContainers = ({listOfContainers, handleDrop}) => {

    const activateContainer = [];
    listOfContainers.map(container => {
        activateContainer.push(<EachContainer key={container.id} info={container} handleDrop={handleDrop}/>);
    });
    return (
        <div className='container' >
            {activateContainer}
        </div>
    )
}
export default DndContainers;
