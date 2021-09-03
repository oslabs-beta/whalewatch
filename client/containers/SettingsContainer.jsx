import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import NavBar from "../components/NavBar/NavBar";

const SettingsContainer = (props) => {

  return (
    <div className='settingsContainer'>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5rem', marginLeft: '250px' }}>
        <h3>Settings</h3>
        <p>Here are the settings.</p>
      </div>
    </div>
  )
}

export default SettingsContainer
