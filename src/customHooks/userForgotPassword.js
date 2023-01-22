import React, { useState, useEffect, useCallback } from "react";
import { GlobalContex } from "../context/contex";

import axios from "axios";
function useForgotPassword(email) {
  const { TOKEN } = useCallback(GlobalContex);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const URL = process.env.REACT_APP_URL;
  async function forgot() {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: URL + "/api/auth/forgot_password",
        headers: {
          Authorization: "Bearer " + TOKEN.token
        },
        data: { email }
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }

  return { data, error, loading, forgot };
}

export default useForgotPassword;
