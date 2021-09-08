import React from 'react';
import { useDrop } from 'react-dnd';
import stop from '../../assets/stop.png'
import restart from '../../assets/restart.png'
import { useQuery, gql, useMutation} from '@apollo/client';

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '2.5rem',
    marginBottom: '1rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};

const STOP_CONTAINER = gql`
mutation stopContainer($id: String) {
  container(id: $id) {
    id
  }
}
`;



function Stop({containerData, handleDrop}) {

    // const stopContainer = (id) => {
    //     const { data, loading, error } = useMutation(STOP_CONTAINER, {
    //         variables: {
    //            id: id
    //        },
    //        onError: (err) => console.log('there is an error in stopping container', err),
    //         onCompleted: (data) => {
    //             console.log('finished mutating container stop')
    //         },
    // })}

   

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'image',
        drop: (item) => {
            console.log('This is the item', item)
            console.log('This is the item info', item.info)
            console.log('We are stopping on stop button')
            // stopContainer(item.id)
            fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    mutation stopContainer ($id: String) { stopContainer(id: $id) {
                        id
                    }
                }
                    `,
                    variables: {
                        id: item.info
                    }
                })
            }
            )
            handleDrop(containerData.filter(container=> container.dockerid !== item.info))  
            // stopContainer(item.id)  
            }   
        ,
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
    <img src={stop} ref={drop} role={'Stop'} style={{...style, backgroundColor}}/>
    {isActive ? 'Release to disactive your container' : 'Drag a container'}
    </div>
    )
}

export default Stop;
