import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import NavBar from '../components/NavBar/NavBar';
import { useQuery, gql } from '@apollo/client';

const ContainersContainer = (props) => {
  const GET_CONTAINERS = gql`
    query containers {
    container {
      id
      dockerid
      name
      size
      status
    }
  }
`;
  const { loading, error, data } = useQuery(GET_CONTAINERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data)

  //store containers
  const activeContainers = data.container;
  console.log('this is active containers', activeContainers)


  return (
    <>
      <NavBar />
      <div>Inactive Containers</div>
      <div>Drag and Drop Actions </div>

    </>
  )
}

export default withAuth(ContainersContainer);