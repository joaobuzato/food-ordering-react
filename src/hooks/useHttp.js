import { useState, useCallback, useEffect } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong.");
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const sendRequest = useCallback(
    async function sendRequest(url, config) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && config.method === "GET") || !config.method) {
      sendRequest(url, config);
    }
  }, [sendRequest, config]);

  return { data, isLoading, error, sendRequest };
}
