import React from 'react';

import './App.css';
import Issues from './components/Issues';
import Commits from './components/Commits';
import MergeRequests from './components/MergeRequests';
import ApiContextProvider from './context/ApiContext';

function App() {
  return (
    <ApiContextProvider>
      <Commits />
      <MergeRequests />
      <Issues />
    </ApiContextProvider>
  );
}

export default App;
