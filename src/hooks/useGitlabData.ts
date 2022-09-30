import { useEffect, useState } from 'react';
import { useApiContext } from '../context/ApiContext';

// Hook for fetching data from Gitlab.
export default function useGitlabData<T>(path: string) {
  // States for storing loading and error flags
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // States for error and data object
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<T | undefined>();

  // Get API data from context
  const { url, repo, apiKey } = useApiContext();

  async function fetchData() {
    // Reset error state at the start of every fecth
    setIsError(false);
    // Set loading to true
    setIsLoading(true);
    try {
      //If some api data is not present, throw an error
      if (!(url && repo && apiKey && path)) throw new Error('Invalid api data');

      // Fetch data from given api path
      const response = await fetch(`${url}/api/v4/projects/${repo}${path}`, {
        headers: {
          Authorization: `Bearer ${apiKey} `
        }
      });

      // If response is not ok, throw an error
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Store data in state
      const data: T = await response.json();
      setData(data);
      // Set loading to false
      setIsLoading(false);
    } catch (error) {
      // Catch any error and set it to state
      setError(error);
      // Set error flag to true and loading flag to false
      setIsError(true);
      setIsLoading(false);
    }
  }

  // Immediately fetch data when hook is called
  useEffect(() => {
    fetchData();
  }, [path, url, repo, apiKey]);

  return {
    data,
    isLoading,
    isError,
    error,
    // Return fetch function as a way to manually refetch data
    refetch: fetchData
  };
}
