import React, { useContext, createContext, ReactNode, useState, SetStateAction, Dispatch } from 'react';

interface ApiContextProps {
  children: ReactNode;
}

interface ApiContextType {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  repo: string;
  setRepo: Dispatch<SetStateAction<string>>;
}

const ApiContext = createContext<ApiContextType>({
  apiKey: '',
  setApiKey: () => null,
  url: '',
  setUrl: () => null,
  repo: '',
  setRepo: () => null
});

export const useApiContext = (): ApiContextType => useContext(ApiContext);

const ApiContextProvider = ({ children }: ApiContextProps) => {
  const [apiKey, setApiKey] = useState('');
  const [url, setUrl] = useState('https://gitlab.stud.idi.ntnu.no');
  const [repo, setRepo] = useState(encodeURIComponent('it2810-h22/Team-37/project_2'));

  return (
    <ApiContext.Provider
      value={{
        apiKey,
        setApiKey,
        url,
        setUrl,
        repo,
        setRepo
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
