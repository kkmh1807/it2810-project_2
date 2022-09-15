import React from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { useApiContext } from '../context/ApiContext';
import { Commit } from '../types/models';

function Commits() {
  const { setApiKey } = useApiContext();
  const { data, fetchData } = useGitlabData<Commit[]>('/repository/commits');

  return (
    <div>
      <input type="text" onChange={(e) => setApiKey(e.target.value)} />
      <button onClick={fetchData}>Start Browsing commits</button>
      {data &&
        data.map((commit, i) => (
          <div key={i}>
            <h1>{commit.author_name}</h1>
            <p>{commit.committer_email}</p>
            <p>{commit.title}</p>
            <p>{commit.short_id}</p>
            <p>Last updated: {commit.committed_date}</p>
          </div>
        ))}
    </div>
  );
}

export default Commits;
