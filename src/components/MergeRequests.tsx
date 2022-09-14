import React from 'react';
import { useApiContext } from '../context/ApiContext';
import { MR } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';

function MergeRequests() {
  const { setApiKey } = useApiContext();
  const { data, fetchData } = useGitlabData<MR[]>('/merge_requests');

  return (
    <div>
      <input type="text" onChange={(e) => setApiKey(e.target.value)} />
      <button onClick={fetchData}>Start Browsing MR</button>
      {data &&
        data.map((mr, i) => (
          <div key={i}>
            <h1>{mr.title}</h1>
            <p>{mr.source_branch}</p>
            <p>{mr.author?.name}</p>
            <p>{mr.reviewer?.name}</p>
          </div>
        ))}
    </div>
  );
}

export default MergeRequests;
