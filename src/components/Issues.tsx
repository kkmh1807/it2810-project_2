import React from 'react';
import { Issue } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import { useApiContext } from '../context/ApiContext';

function Issues() {
  const { setApiKey } = useApiContext();
  const { data, fetchData } = useGitlabData<Issue[]>('/issues');

  return (
    <div>
      <input type="text" onChange={(e) => setApiKey(e.target.value)} />
      <button onClick={fetchData}>Start Browsing issues</button>
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
