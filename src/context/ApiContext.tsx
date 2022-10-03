import React, { useContext, createContext, ReactNode, useState } from 'react';

interface ApiContextProps {
  children: ReactNode;
}

export interface ApiContextType {
  apiKey: string;
  setApiKey: (val: string) => void;
  url: string;
  setUrl: (val: string) => void;
  repo: string;
  setRepo: (val: string) => void;
}

export const ApiContext = createContext<ApiContextType>({
  apiKey: '',
  setApiKey: () => null,
  url: '',
  setUrl: () => null,
  repo: '',
  setRepo: () => null
});

export const useApiContext = (): ApiContextType => useContext(ApiContext);

const ApiContextProvider = ({ children }: ApiContextProps) => {
  // Set state for apiKey, url and repo, with default begin saved session storage values if they exist
  const [apiKey, setApiKey] = useState(sessionStorage.getItem('apiKey') || '');
  const [url, setUrl] = useState(sessionStorage.getItem('url') || '');
  const [repo, setRepo] = useState(sessionStorage.getItem('repo') || '');

  // Custom setter for each of the context values
  const updateApiKey = (value: string) => {
    // Store the value to session storage
    sessionStorage.setItem('apiKey', value);
    // Local storage values, e.g branch name for filtering, are related
    // to current api configuration, so we clear them when the api context is updated
    localStorage.clear();
    // Set the value to the state
    setApiKey(value);
  };
  const updateUrl = (value: string) => {
    sessionStorage.setItem('url', value);
    localStorage.clear();
    setUrl(value);
  };
  const updateRepo = (value: string) => {
    sessionStorage.setItem('repo', value);
    localStorage.clear();
    setRepo(value);
  };

  return (
    <ApiContext.Provider
      value={{
        apiKey,
        setApiKey: updateApiKey,
        url,
        setUrl: updateUrl,
        repo,
        setRepo: updateRepo
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
