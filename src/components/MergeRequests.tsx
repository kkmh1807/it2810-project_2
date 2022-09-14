import React, { useState } from 'react';
import { Person } from '../models';

interface MR {
  title: string;
  reviewer?: Person;
  assignee?: Person;
  author?: Person;
  source_branch: string;
  target_branch?: string;
  state: string;
}

function MergeRequests() {
  const id = encodeURIComponent('it2810-h22/Team-37/project_2');
  const [mr, setMr] = useState<MR[] | undefined>();
  const [apiKey, setApiKey] = useState('');

  function fetchMr() {
    // TODO Ikke la den fetche etter at den alledrede er fetcha
    fetch(`https://gitlab.stud.idi.ntnu.no/api/v4/projects/${id}/merge_requests`, {
      headers: {
        Authorization: `Bearer ${apiKey} `
      }
    }).then(async (response) => {
      if (response.ok) {
        const data: MR[] = await response.json();
        console.log(data);
        setMr(data);
      }
    });
  }
  return (
    <div>
      <input type="text" onChange={(e) => setApiKey(e.target.value)} />
      <button onClick={fetchMr}>Start Browsing</button>
      {mr &&
        mr.map((mr, i) => (
          <div key={i}>
            <h1>{mr.title}</h1>
            <p>{mr.source_branch}</p>
            <p>{mr.author?.name}</p>
            <p>{mr.reviewer?.name}</p>
          </div>
        ))}
    </div>
  );
}

export default MergeRequests;
