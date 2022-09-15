import React, { useState } from 'react';
import { useApiContext } from '../context/ApiContext';
import { Link } from 'react-router-dom';

function Home() {
  const { setApiKey, setUrl, setRepo } = useApiContext();
  const [strippedUrl, setStrippedUrl] = useState('');
  const [strippedRepo, setStrippedRepo] = useState('');

  //   Strip the repo from input from user
  function stripRepo(input: string) {
    setStrippedUrl(input.split('/')[0] + '//' + input.split('/')[2]);
    let repo = input.split('/')[3];
    for (let i = 4; i < input.split('/').length; i++) {
      repo = repo + '/' + input.split('/')[i];
      console.log(repo);
    }
    setStrippedRepo(repo);
  }

  const setContext = () => {
    // Set the input from the user into application context.
    setRepo(encodeURIComponent(strippedRepo));
    setUrl(strippedUrl);
  };

  return (
    <>
      <input type="text" placeholder="Enter API key here.." onChange={(e) => setApiKey(e.target.value)} />
      <input type="text" placeholder="Enter URL here.." onChange={(e) => stripRepo(e.target.value)} />
      <Link to="/overview" onClick={setContext}>
        Start browsing
      </Link>
    </>
  );
}

export default Home;
