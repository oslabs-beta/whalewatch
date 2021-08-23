import React from "react";
import { useState } from 'react';
import { withAuth } from "../withAuth";
import WhaleChart from "../components/dashboard/WhaleChart";
import AverageCPUChart from "../components/dashboard/AverageCPUChart";
import AverageMemoryChart from "../components/dashboard/AverageMemoryChart";
import NetIOChart from "../components/dashboard/NetIOChart";

const DashboardContainer = (props) => {

  return (
    <>
      <div>
        <WhaleChart />
      </div>
      <div>
        <AverageCPUChart />
        <AverageMemoryChart />
        <NetIOChart />
      </div>
    </>
  )

}

export default withAuth(DashboardContainer)