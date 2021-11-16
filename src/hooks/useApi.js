import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/fetch';

function useApi(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function getData(url) {
    setIsLoading(true);

    try {
      const data = await fetchData(url);

      setData(data.provincias);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData(url);
  }, [url]);

  return {
    data,
    error,
    isLoading,
    getData,
  };
}

export default useApi;
