import React, { useEffect } from 'react';
import { MR } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';

function MergeRequests() {
  const { data, fetchData } = useGitlabData<MR[]>('/merge_requests');

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
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
