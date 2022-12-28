import "./App.css";
// import "flowbite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// components
import Navbar from "./components/Navbar.js";
// pages
import SignIn from "./pages/Authentication/SignIn.js";
import SignUp from "./pages/Authentication/SignUp.js";
import FogotPassword from "./pages/Authentication/ForgotPassword.js";
import ResetPassword from "./pages/Authentication/ResetPassword.js";
import Home from "./pages/Home";

import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App h-[100vh]">
      <Navbar />
      <ToastContainer />
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
