import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <>
      <Link to="/commits">Go to commits</Link>
      <Link to="/mergerequests">Go to merge requests</Link>
      <Link to="/issues">Go to issues</Link>
    </>
  );
};

export default Overview;
