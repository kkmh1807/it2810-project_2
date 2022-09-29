import React, { useEffect } from 'react';
import { MR } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import '../styles/MergeRequest.css';
import { urlToGitlab } from '../helper/Utils';
import { useApiContext } from '../context/ApiContext';

function MergeRequests() {
  const { data, fetchData } = useGitlabData<MR[]>('/merge_requests');
  const endpoint = '/merge_requests/';
  const Linkdata = useApiContext();
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Container">
      {data &&
        data.map((mr, i) => (
          <a className="mrContainer" key={i} href={urlToGitlab(Linkdata, endpoint, mr.iid.toString())} rel="noreferrer" target="_blank">
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
