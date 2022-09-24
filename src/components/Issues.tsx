import React, { useEffect, useState } from 'react';
import { Issue } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import { useApiContext } from '../context/ApiContext';
import '../styles/Issues.css';
import '../styles/Selector.css';

function Issues() {
  const { data, fetchData } = useGitlabData<Issue[]>('/issues');
  const linkData = useApiContext();
  const endpoint = '/issues/';
  const [filter, setFilter] = useState('');
  const states = Array.from(new Set(data?.map((issue) => issue.state)));

  const filteredData = filter ? data?.filter((issue) => issue.state === filter) : data;

  function urlToGitlab(endpoint: string, Id: string) {
    return `${linkData.url}/${decodeURIComponent(linkData.repo)}/-${endpoint}${Id}`;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="issues-container">
      <select className="select" value={filter} defaultValue={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">Alle</option>
        {states.map((state, i) => (
          <option key={i} value={state}>
            {state}
          </option>
        ))}
      </select>
      {filteredData &&
        filteredData.map((issues, i) => (
          <a key={i} href={urlToGitlab(endpoint, issues.iid.toString())} target="_blank" rel="noreferrer">
            <div key={i} className="issues-card">
              <h1>{issues.title}</h1>
              <h2>{issues.state}</h2>
              <p>
                {issues.assignees?.length === 0 ? <></> : 'Assignee: ' + issues.assignee?.username}
                <br />
                {'Author: ' + issues.author.username}
              </p>
            </div>
          </a>
        ))}
    </div>
  );
}

export default Issues;
