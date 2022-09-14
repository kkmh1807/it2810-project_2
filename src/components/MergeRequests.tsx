import React, { useState } from 'react';

interface MR {
  title: string;
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
            {/* <p>{mr.committer_email}</p>
            <p>{mr.message}</p>
            <p>{mr.short_id}</p> */}
          </div>
        ))}
    </div>
  );
}

export default MergeRequests;
