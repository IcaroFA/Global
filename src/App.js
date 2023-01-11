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
import Donations from "./pages/Donations/Index.js";
import Logout from "./components/popUp/Logout.js";
import Donate from "./pages/Donate";
import Status from "./pages/Status";
import Profile from "./pages/Profile";
import Requests from "./pages/requests/Index.js";
import Agents from "./pages/Agents/Index.js";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Assigned from "./pages/Assigned/Index";

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
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/donations" element={<Donations />} />
                <Route path="/donations/:donationId" element={<Donations />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/status" element={<Status />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/requests/:donationId" element={<Requests />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/agents/:agentId" element={<Agents />} />
                <Route path="/assigned" element={<Assigned />} />
                <Route path="/assigned/:donationId" element={<Assigned />} />
                <Route />
              </Route>
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
