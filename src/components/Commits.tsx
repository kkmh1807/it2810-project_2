import React, { useState } from 'react';

interface Commit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  created_at: string;
  message: string;
  parent_ids: string[];
  web_url: string;
}

function Commits() {
  const id = encodeURIComponent('it2810-h22/Team-37/project_2');
  const [commits, setCommits] = useState<Commit[] | undefined>();
  const [apiKey, setApiKey] = useState('');

  function fetchCommits() {
    // TODO Ikke la den fetche etter at den alledrede er fetcha
    fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${id}/repository/commits`, {
      headers: {
        Authorization: `Bearer ${apiKey} `
      }
    }).then(async (response) => {
      if (response.ok) {
        const data: Commit[] = await response.json();
        setCommits(data);
        console.log(data);
      }
    });
  }

  return (
    <div>
      <input type="text" onChange={(e) => setApiKey(e.target.value)} />
      <button onClick={fetchCommits}>Start Browsing</button>
      {commits &&
        commits.map((commit, i) => (
          <div key={i}>
            <h1>{commit.author_name}</h1>
            <p>{commit.committer_email}</p>
            <p>{commit.message}</p>
            <p>{commit.short_id}</p>
          </div>
        ))}
    </div>
  );
}

export default Commits;
