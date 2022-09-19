import React, { useEffect } from 'react';
import useGitlabData from '../hooks/useGitlabData';
import { Commit } from '../types/models';

function Commits() {
  const { data, fetchData } = useGitlabData<Commit[]>('/repository/commits');

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data &&
        data.map((commit, i) => (
          <div key={i}>
            <h1>{commit.author_name}</h1>
            <p>{commit.committer_email}</p>
            <p>{commit.title}</p>
            <p>{commit.short_id}</p>
            <p>Last updated: {commit.committed_date}</p>
          </div>
        ))}
    </div>
  );
}

export default Commits;
