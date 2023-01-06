import "./App.css";
// import "flowbite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GlobalContex } from "./context/contex";
import { useEffect, useContext } from "react";

// components
import Navbar from "./components/Navbar.js";
// pages
import SignIn from "./pages/Authentication/SignIn.js";
import SignUp from "./pages/Authentication/SignUp.js";
import FogotPassword from "./pages/Authentication/ForgotPassword.js";
import ResetPassword from "./pages/Authentication/ResetPassword.js";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Logout from "./components/popUp/Logout.js";
import Donation from "./pages/Donation";
import Status from "./pages/Status";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
function App() {
  const { setUserData, userLoading, showLogoutPopUp, setUserLoading } =
    useContext(GlobalContex);
  const URL = process.env.REACT_APP_URL;
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setUserLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/auth/user",
        withCredentials: true
      });
      if (response.data.success) {
        setUserData(response.data.data);
        setUserLoading(false);
      }
    } catch (error) {
      setUserLoading(false);
    }
  }

  return (
    <div className="App h-[100vh]">
      {userLoading ? (
        <div className="hero-particles   h-full w-full"></div>
      ) : (
        <>
          <Navbar />
          <div className=" h-full pt-20">
            <Routes>
              <Route path="/sign_in" element={<SignIn />} />
              <Route path="/sign_up" element={<SignUp />} />
              <Route
                path="/reset_password/:resetPasswordToken"
                element={<ResetPassword />}
              />
              <Route path="/forgot_password" element={<FogotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/status" element={<Status />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>

          {/* // logout popup */}
          {showLogoutPopUp ? <Logout /> : null}
          {/* // tostify */}
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
