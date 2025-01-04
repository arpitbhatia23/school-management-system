import { useState, useCallback } from 'react';

export const useRetry = (retryCount = 3, retryDelay = 1000) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWithRetry = useCallback(
    async (fetchFunction) => {
      setLoading(true);
      setError(null);

      for (let attempt = 1; attempt <= retryCount; attempt++) {
        try {
          const result = await fetchFunction();
          setData(result);
          setLoading(false);
          return result;
        } catch (err) {
          if (attempt === retryCount) {
            setError(err);
            setLoading(false);
            throw err;
          }

          // Wait for retryDelay before the next attempt
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    },
    [retryCount, retryDelay],
  );

  return { data, error, loading, fetchWithRetry };
};
