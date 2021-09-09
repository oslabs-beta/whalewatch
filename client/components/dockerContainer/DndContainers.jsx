import React from 'react'
import EachContainer from './EachContainer';

const DndContainers = ({listOfContainers, state}) => {

  const allContainer = [];
  listOfContainers.map(container => {
    if(container.state === state){
      allContainer.push(<EachContainer key={container.id} info={container}/>);
    }
  });
  return (
    <div id="container-list-dnd">
      {allContainer}
    </div>
  )
};
export default DndContainers;
