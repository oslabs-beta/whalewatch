import React from "react";

const Notification = (props) => {

  return (
    <>
      <p style={{ border: '1px solid black', borderRadius: '5px', padding: '1rem', color: 'orangered', marginTop: '.5rem' }}> Alert! Your container is using too much memory. We recommend restarting the container.</p >
      <p style={{ border: '1px solid black', borderRadius: '5px', padding: '1rem', color: 'orangered', marginTop: '.5rem' }}> Alert! Your container is using too much CPU. We recommend restarting the container.</p >
    </>
  )
}

export default Notification;