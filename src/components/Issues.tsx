import React, { useEffect } from 'react';
import { Issue } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';

function Issues() {
  const { data, fetchData } = useGitlabData<Issue[]>('/issues');

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data &&
        data.map((issues, i) => (
          <div key={i}>
            <h1>{issues.title}</h1>
            <p>{issues.state}</p>
            <p>{issues.author.username}</p>
            <p>{issues.assignee?.username}</p>
          </div>
        ))}
    </div>
  );
}

export default Issues;
