import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Filter from "../../components/popUp/Filter.js";
import { GlobalContex } from "../../context/contex";
import loadingSvg from "../../asset/loading.svg";
import axios from "axios";
import DonationStatus from "../../components/DonationStatus.js";

function Dashboard() {
  const URL = process.env.REACT_APP_URL;
  const { notify, filter, userData } = useContext(GlobalContex);
  const [loading, setLoading] = useState(false);
  const [donationData, setDonationData] = useState([]);
  useEffect(() => {
    getDonation();
  }, [filter]);

  async function getDonation() {
    try {
      const response = await axios({
        method: "get",
        withCredentials: true,
        url: `${URL}/api/donations?donorId=${
          userData.role === "DONOR" ? userData._id : ""
        }&from=${filter.from}&to=${filter.to}&status=${
          filter.status === "ALL" ? "" : filter.status
        }`
      });
      if (response.data.success) {
        setLoading(false);
        setDonationData(response.data.data);
      }
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  }

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="h-full relative flex-1 p-4 bg-blue-50  dark:bg-gray-800 overflow-scroll">
        <header className="border-b-4 border-blue-300  dark:border-gray-500  flex    items-center justify-between">
          <h1 className="text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Dashboard
          </h1>
          <Filter />
        </header>
        {loading ? (
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
export default Dashboard;
