import React, { useEffect } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';
import { useApiContext } from '../context/ApiContext';
import '../styles/Commits.css';

function Commits() {
  const { data, fetchData } = useGitlabData<Commit[]>('/repository/commits');

  useEffect(() => {
    fetchData();
  }, []);

  const LinkData = useApiContext();

  function urlToGitlab(commitId: string) {
    return `${LinkData.url}/${decodeURIComponent(LinkData.repo)}/-/commit/${commitId}`;
  }

  return (
    <div className="card-container">
      {data &&
        data.map((commit, i) => (
          <a className="card-link" href={urlToGitlab(commit.short_id)} key={i} rel="noreferrer" target="_blank">
            <div className="commit-card">
              <p className="auth-name">{commit.author_name}</p>
              <p className="title">{commit.title}</p>
              <p className="short-id">{commit.short_id}</p>
              <p className="commit-date">{commit.committed_date.substring(0, 10)}</p>
            </div>
          </a>
        ))}
    </div>
  );
}

export default Commits;
