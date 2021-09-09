import React, { useState, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import stop from '../../assets/stop.png'
import restart from '../../assets/restart.png'
import { useQuery, gql, useMutation} from '@apollo/client';

const style = {
  height: '8rem',
  width: '8rem',
  marginRight: '4rem',
  marginBottom: '1rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

function Stop({containerData, handleDrop, refetch}) {

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
          mutation stopContainer ($id: String) { 
            stopContainer(id: $id) {
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
    backgroundColor = '#c80004';
  }
  return (
    <div>
      <img src={stop} ref={drop} role={'Stop'} style={{...style, backgroundColor}}/>
    </div>
  )
}

export default Stop;
