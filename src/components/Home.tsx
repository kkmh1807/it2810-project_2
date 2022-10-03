import React, { useState, FormEvent } from 'react';
import { useApiContext } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Logo from '../assets/images/logo_text.svg';
import '../styles/Home.css';

function Home() {
  const { apiKey, setApiKey, setUrl, setRepo } = useApiContext();
  const [strippedUrl, setStrippedUrl] = useState('');
  const [strippedRepo, setStrippedRepo] = useState('');
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  //   Strip the repo from input from user
  function stripRepo(input: string) {
    setStrippedUrl(input.split('/')[0] + '//' + input.split('/')[2]);
    let repo = input.split('/')[3];
    for (let i = 4; i < input.split('/').length; i++) {
      repo = repo + '/' + input.split('/')[i];
    }
    setStrippedRepo(encodeURIComponent(repo));
  }

  const setContext = async (e: FormEvent) => {
    setShowError(false);
    // Set the input from the user into application context.
    e.preventDefault();
    const response = await fetch(`${strippedUrl}/api/v4/projects/${strippedRepo}/repository/branches`, {
      headers: {
        Authorization: `Bearer ${apiKey} `
      }
    });

    if (!response.ok) return setShowError(true);

    setUrl(strippedUrl);
    setRepo(strippedRepo);

    navigate('/overview');
  };

  return (
    <div className="landing-page-container">
      <img src={Logo} />
      <form onSubmit={(e) => setContext(e)}>
        <label htmlFor="apiInput">Enter your API-key</label>
        <InputField placeholder="<your_access_token>" regexPattern="glpat-[A-Za-z0-9_-]{20}" setter={setApiKey} />
        <label htmlFor="apiInURLInputput">Enter your URL</label>
        <InputField placeholder="https://gitlab.your.repo.domain/projectName" regexPattern="https://gitlab\..*/.*" setter={stripRepo} />
        <button type="submit" className="start-btn">
          Start Browsing
        </button>
        {showError && <div className="invalid-data">The data you entered is not valid</div>}
      </form>
    </div>
  );
}

export default Home;
