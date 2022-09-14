import React, { useState } from 'react';

interface Person {
  id: number;
  username: string;
}

interface Issue {
  title: string;
  state: string;
  description: string;
  author: Person;
  assignee?: Person;
}

function Issues() {
  const id = encodeURIComponent('it2810-h22/Team-37/project_2');
  const [issues, setIssues] = useState<Issue[] | undefined>();
  const [apiKey, setApiKey] = useState('');

  function fetchIssues() {
    // TODO Ikke la den fetche etter at den alledrede er fetcha
    fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${id}/issues`, {
      headers: {
        Authorization: `Bearer ${apiKey} `
      }
    }).then(async (response) => {
      if (response.ok) {
        const data: Issue[] = await response.json();
        setIssues(data);
        console.log(data);
      }
    });
  }
  return (
    <div>
      <input type="text" onChange={(e) => setApiKey(e.target.value)} />
      <button onClick={fetchIssues}>Start Browsing</button>
      {issues &&
        issues.map((issues, i) => (
          <div key={i}>
            <h1>{issues.title}</h1>
            <p>{issues.state}</p>
            <p>{issues.description}</p>
            <p>{issues.author.username}</p>
            <p>{issues.assignee?.username}</p>
          </div>
        ))}
    </div>
  );
}

export default Issues;
