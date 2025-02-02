import { useState } from 'react';
type FetchOptions = {
  method: string;
  headers: {
    'Content-Type': string;
  };
  body?: string | null;
};
type FetchHookReturn = {
  loading: boolean;
  error: string | null;
  fetchData: (url: string, method?: string, body?: any) => Promise<any>;
};

const useFetchHook = (): FetchHookReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async (url: string, method: string = 'GET', body: any = null): Promise<any> => {
    setLoading(true);
    setError(null);
    const options: FetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (body) {
      options.body = JSON.stringify(body); 
    }
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      return result; // Returning the result here
    } catch (err: any) {
      setError(err.message);
      return err; // If an error occurs, return null
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, fetchData };
};
export default useFetchHook;