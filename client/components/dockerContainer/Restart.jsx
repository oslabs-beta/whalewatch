import React from 'react';
import { useDrop } from 'react-dnd';
import stop from '../../assets/stop.png'
import restart from '../../assets/restart.png'

const style = {
  height: '8rem',
  width: '8rem',
  padding: '1rem',
  marginBottom: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};


function Restart({containerData, handleDrop, state, refetch}) {   
  
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'image',
    drop: (item) => {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          mutation restartContainer ($id: String){ 
            restartContainer(id: $id) {
              id
            }
          }`,
          variables: {
            id: item.info
          }
        })
      })
      .then(data => refetch())  
      //handleDrop(containerData.filter(container=> container.dockerid !== item.info))
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let backgroundColor;
  if (isActive) {
    backgroundColor = 'lightblue';
  }

  return (
    <div>
      <img src={restart} ref={drop} role={'restart'} style={{...style, backgroundColor}}/>
    </div>
  )
}

export default Restart;
