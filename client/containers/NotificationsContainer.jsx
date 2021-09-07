import React from "react";
import { useState } from 'react';
import NavBar from "../components/NavBar/NavBar";
import Notification from "../components/notification/Notification";

const NotificationsContainer = (props) => {
  return (
    <div className="notification-container" style={{ display: 'flex' }}>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem', marginLeft: '250px' }}>
        <h3>Notifications <i className="bi bi-bell-fill"></i></h3>
        <Notification />
      </div>
    </div>
  )
}

export default NotificationsContainer