import React, { useEffect } from 'react';
import { Issue } from '../types/models';
import useGitlabData from '../hooks/useGitlabData';
import '../styles/Issues.css';
import { useApiContext } from '../context/ApiContext';

function Issues() {
  const { data, fetchData } = useGitlabData<Issue[]>('/issues');
  const linkData = useApiContext();

  const generateURL = (issueId: string) => {
    return `${linkData.url}/${decodeURIComponent(linkData.repo)}/-/issues/${issueId}`;
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="issues-container">
      {data &&
        data.map((issues, i) => (
          <a key={i} href={generateURL(issues.iid.toString())} target="_blank" rel="noreferrer">
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
