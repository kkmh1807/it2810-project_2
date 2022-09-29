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
  const [apiKey, setApiKey] = useState(sessionStorage.getItem('apiKey') || '');
  const [url, setUrl] = useState(sessionStorage.getItem('url') || '');
  const [repo, setRepo] = useState(sessionStorage.getItem('repo') || '');

  const updateApiKey = (value: string) => {
    sessionStorage.setItem('apiKey', value);
    localStorage.clear();
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
