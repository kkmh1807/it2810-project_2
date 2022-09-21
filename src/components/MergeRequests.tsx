import React, { useEffect } from 'react';
import { MR } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import '../styles/MergeRequest.css';
import { useApiContext } from '../context/ApiContext';

function MergeRequests() {
  const { data, fetchData } = useGitlabData<MR[]>('/merge_requests');
  const endpoint = '/merge_requests/';
  useEffect(() => {
    fetchData();
  }, []);

  const LinkData = useApiContext();

  function urlToGitlab(endpoint: string, commitId: string) {
    return `${LinkData.url}/${decodeURIComponent(LinkData.repo)}/-${endpoint}${commitId}`;
  }
  return (
    <div className="Container">
      {data &&
        data.map((mr, i) => (
          <a className="mrContainer" key={i} href={urlToGitlab(endpoint, mr.iid.toString())} rel="noreferrer" target="_blank">
            <div className="mr">
              <h1>{mr.title}</h1>
              <p>{mr.source_branch}</p>
              <p id="author">{mr.author?.name}</p>
            </div>
          </a>
        ))}
    </div>
  );
}

export default MergeRequests;
