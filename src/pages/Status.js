import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { GlobalContex } from "../context/contex";
import loadingSvg from "../asset/loading.svg";
import DonationStatus from "../components/DonationStatus";
import useFetchData from "../customHooks/useFetchData";

function Status() {
  const URL = process.env.REACT_APP_URL;
  const [donationData, setDonationData] = useState({ donations: [] });
  const { notify, userData } = useContext(GlobalContex);
  const [page, setPage] = useState(1);
  const url = (page) => `${URL}/api/donations?donorId=${userData._id}`;

  const { loading, error, data, fetchData } = useFetchData(url(page));

  useEffect(() => {
    if (!loading) setDonationData(data);
  });

  useEffect(() => {
    if (error) notify(error);
  }, [error]);

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full relative flex-1 p-4 bg-blue-50  dark:bg-gray-800 overflow-scroll">
        <header className="border-b-4 border-blue-300  dark:border-gray-500 ">
          <h1 className="text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Donation Status
          </h1>
        </header>
        {loading ? (
          <div className="absolute flex items-center justify-center h-full    left-0 top-0 w-full">
            <img src={loadingSvg} alt="loging" />
          </div>
        ) : (
          <div className="  md:my-3">
            {donationData.donations &&
              donationData.donations
                .filter(
                  (e) => e.status === "PENDING" || e.status === "ACCEPTED"
                )
                .map((item) => {
                  return (
                    <DonationStatus
                      key={item._id}
                      item={item}
                      setDonationData={setDonationData}
                    />
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Status;
