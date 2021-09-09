import React from 'react'
import EachContainer from './EachContainer';
// import { useDrag } from 'react-dnd'


const DndContainers = ({listOfContainers, handleDrop, state}) => {

    const allContainer = [];
    listOfContainers.map(container => {
        if(container.state === state){

            allContainer.push(<EachContainer key={container.id} info={container} handleDrop={handleDrop}/>);
        }
    });
    
    return (
        <div id="container-list-dnd">
            {allContainer}
        </div>
    )
}
export default DndContainers;
