import React, { useEffect } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';
import { useApiContext } from '../context/ApiContext';
import Selector from './Selector';
import '../styles/Commits.css';
import useLocalStorage from '../hooks/useLocalStorage';

function Commits() {
  const [chosenBranch, setChosenBranch] = useLocalStorage('current-branch', 'All branches');
  const { data, fetchData } = useGitlabData<Commit[]>(
    `/repository/commits?${chosenBranch === 'All branches' ? 'all=true' : `ref_name=${chosenBranch}`}`
  );
  const linkData = useApiContext();
  const endpoint = '/commit/';

  const branches = useGitlabData<{ name: string }[]>('/repository/branches');
  const branchNames = ['All branches', ...Array.from(new Set(branches.data?.map((branch) => branch.name))).reverse()];

  function urlToGitlab(endpoint: string, Id: string) {
    return `${linkData.url}/${decodeURIComponent(linkData.repo)}/-${endpoint}${Id}`;
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
        <Selector value={chosenBranch} setValue={setChosenBranch} values={branchNames} />
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
