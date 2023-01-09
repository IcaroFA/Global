import axios from "axios";
import React, { useState, useEffect } from "react";

function useFetchData(url) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    fetchData(url);
  }, []);

  async function fetchData(url) {
    setLoading(true);
    try {
      const response = await axios({
        methode: "get",
        url: url,
        withCredentials: true
      });
      if (response.data.success) {
        setData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }
  return { error, loading, data, fetchData };
}

export default useFetchData;
