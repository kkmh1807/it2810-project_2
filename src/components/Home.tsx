import React, { useState } from 'react';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo_text.svg';
import '../styles/Home.css';

function Home() {
  const { setApiKey, setUrl, setRepo } = useApiContext();
  const [strippedUrl, setStrippedUrl] = useState('');
  const [strippedRepo, setStrippedRepo] = useState('');
  const navigate = useNavigate();

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

  const setContext = (e: Event) => {
    // Set the input from the user into application context.

    setRepo(encodeURIComponent(strippedRepo));
    setUrl(strippedUrl);
    e.preventDefault();
    navigate('/overview');
  };

  return (
    <>
      <div className="landing-page-container">
        <img src={Logo} />
        <form onSubmit={() => setContext}>
          <label htmlFor="apiInput">Enter your API-key</label>
          <input id="apiInput" type="text" placeholder="<your_access_token>" onChange={(e) => setApiKey(e.target.value)} required />
          <label htmlFor="apiInURLInputput">Enter your URL</label>
          <input
            id="URLInput"
            type="text"
            placeholder="https://gitlab.your.repo.url/projectName"
            onChange={(e) => stripRepo(e.target.value)}
            required
          />
          <button type="submit" className="start-btn">
            Start Browsing
          </button>
        </form>
        {/* <Link className="start-btn" to="/overview" onClick={setContext}>
          Start browsing
        </Link> */}
      </div>
    </>
  );
}

export default Home;
