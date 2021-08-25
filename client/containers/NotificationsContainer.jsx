import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import NavBar from "../components/NavBar/NavBar";

const NotificationsContainer = (props) => {
  return (
    <>
      <NavBar />
      <div>

      </div>
    </>
  )
}

export default withAuth(NotificationsContainer)