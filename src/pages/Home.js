import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { GlobalContex } from "../context/contex";

function Home() {
  const { notify, userData, setUserData } = useContext(GlobalContex);
  const [loadign, setLoading] = useState(false);
  const URL = process.env.REACT_APP_URL;
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/auth/user",
        withCredentials: true
      });
      if (response.data.success) {
        setUserData(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  return <div>Home</div>;
}

export default Home;
