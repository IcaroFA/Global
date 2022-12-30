import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { GlobalContex } from "../context/contex";
import loadingSvg from "../asset/loading.svg";
import DonationStatus from "../components/DonationStatus";

function Status() {
  const URL = process.env.REACT_APP_URL;
  const [statusLoading, setStatusLoading] = useState(false);
  const [donationData, setDonationData] = useState([]);
  const { notify, userData } = useContext(GlobalContex);
  useEffect(() => {
    getDonation();
  }, []);

  async function getDonation() {
    setStatusLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: `${URL}/api/donations?donorId=${userData._id}`,
        withCredentials: true
      });
      if (response.data.success) {
        setDonationData(response.data.data);
      }
      setStatusLoading(false);
    } catch (error) {
      setStatusLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="h-full relative flex-1 p-4 bg-blue-50  dark:bg-gray-800 overflow-scroll">
        <header className="border-b-4 border-blue-300  dark:border-gray-500 ">
          <h1 className="text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Donation Status
          </h1>
        </header>
        {statusLoading ? (
          <div className="absolute flex items-center justify-center h-full    left-0 top-0 w-full">
            <img src={loadingSvg} alt="loging" />
          </div>
        ) : (
          <div className="  md:my-3">
            {donationData.map((item) => {
              return <DonationStatus key={item._id} item={item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Status;
