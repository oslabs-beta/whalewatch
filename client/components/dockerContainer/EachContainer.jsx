import React from "react";
import { withAuth } from "../../withAuth";
// import { useDrag } from 'react-dnd'

const EachContainer = ({info}) => {

return (
    <div className='container-display'>
        <p>{info.id}</p>
        {/* {info.size}
        {info.status}
        {info.dockerid} */}
    </div>
)
}

export default EachContainer;