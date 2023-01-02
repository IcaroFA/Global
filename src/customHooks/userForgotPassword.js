import React, { useState, useEffect } from "react";
import axios from "axios";
function useForgotPassword(email) {
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
