import React from 'react'
import EachContainer from './EachContainer';
// import { DragSource } from 'react-dnd';



const DndContainers = ({listOfContainers}) => {
    const list = listOfContainers.container
    console.log(list)
    const activateContainer = [];
    list.map(container => {
        activateContainer.push(<EachContainer key={container.id} info={container} />);
    });

    return (
        <div className='container'>
            {activateContainer}
        </div>
    )
}

export default DndContainers
