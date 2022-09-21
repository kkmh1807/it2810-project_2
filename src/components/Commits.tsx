import React, { useEffect, useState } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';
import { useApiContext } from '../context/ApiContext';
import '../styles/Commits.css';

function Commits() {
  const [chosenBranch, setChosenBranch] = useState('main');
  const { data, fetchData } = useGitlabData<Commit[]>(`/repository/commits?ref_name=${chosenBranch}`);
  const branches = useGitlabData<{ name: string }[]>('/repository/branches');
  const LinkData = useApiContext();
  const endpoint = '/commit/';
  console.log(data);

  function urlToGitlab(endpoint: string, commitId: string) {
    return `${LinkData.url}/${decodeURIComponent(LinkData.repo)}/-${endpoint}${commitId}`;
  }

  useEffect(() => {
    fetchData();
  }, [chosenBranch]);

  useEffect(() => {
    branches.fetchData();
  }, []);

  return (
    <>
      <h1>
        Showing commits on
        <select className="select" value={chosenBranch} defaultValue={chosenBranch} onChange={(e) => setChosenBranch(e.target.value)}>
          {branches.data?.map((branch, i) => (
            <option key={i} value={branch.name}>
              {branch.name}
            </option>
          ))}
        </select>
      </h1>
      <div className="card-container">
        {data &&
          data.map((commit, i) => (
            <a className="card-link" href={urlToGitlab(endpoint, commit.short_id)} key={i} rel="noreferrer" target="_blank">
              <div className="commit-card">
                <p className="auth-name">{commit.author_name}</p>
                <p className="title">{commit.title}</p>
                <p className="short-id">{commit.short_id}</p>
                <p className="commit-date">{commit.committed_date.substring(0, 10)}</p>
              </div>
            </a>
          ))}
      </div>
    </>
  );
}

export default Commits;
