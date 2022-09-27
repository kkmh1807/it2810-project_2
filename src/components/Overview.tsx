import React, { useEffect } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';

const Overview = () => {
  const { data, fetchData } = useGitlabData<Commit[]>(`/repository/commits}`);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  return <div>Overview</div>;
};

export default Overview;
