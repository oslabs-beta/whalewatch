import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import WhaleChart from "../components/dashboard/WhaleChart";
import AverageCPUChart from "../components/dashboard/AverageCPUChart";
import AverageMemoryChart from "../components/dashboard/AverageMemoryChart";
import NetIOChart from "../components/dashboard/NetIOChart";

const DashboardContainer = (props) => {

  const [listOfContainers, setListOfContainers] = useState([]);
  //need piece of state for stats

  //functionality to grab list of containers here

  //functionality to grab stats here

  return (
    <>
      {/* render navbar here */}
      <div>
        <WhaleChart listOfContainers={listOfContainers} />
      </div>
      <div>
        {/* the below need to be passed the appropriate stats */}
        <AverageCPUChart />
        <AverageMemoryChart />
        <NetIOChart />
      </div>
    </>
  )

}

export default withAuth(DashboardContainer)