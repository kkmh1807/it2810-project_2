import { useState } from 'react';
import { useApiContext } from '../context/ApiContext';

// Hook for fetching data from Gitlab.
export default function useGitlabData<T>(path: string) {
  const { url, repo, apiKey } = useApiContext();
  const [data, setData] = useState<T | undefined>();
  // TODO: useEffect, dont fetch without params, refetch?

  async function fetchData() {
    const response = await fetch(`${url}/api/v4/projects/${repo}${path}`, {
      headers: {
        Authorization: `Bearer ${apiKey} `
      }
    });
    if (response.ok) {
      const data: T = await response.json();
      setData(data);
    }
  }

  return { data, fetchData };
}
