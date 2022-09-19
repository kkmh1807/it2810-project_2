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
    <div className="CardContainer">
      {data &&
        data.map((commit, i) => (
          <a className="Link" href={urlToGitlab(commit.short_id)} key={i} rel="noreferrer" target="_blank">
            <div className="CommitCard">
              <p className="AuthName">{commit.author_name}</p>
              <p className="Title">{commit.title}</p>
              <p className="ShortId">{commit.short_id}</p>
              <p className="CommitDate">{commit.committed_date.substring(0, 10)}</p>
            </div>
          </a>
        ))}
    </div>
  );
}

export default Commits;
