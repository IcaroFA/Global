import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import DonationInfo from "../../components/DonationInfo.js";
import DonationList from "../../components/donationLists";
function Index() {
  const { donationId } = useParams();
  const [currentDonation, setCurrentDonation] = useState({
    page: 1,
    donation: {}
  });

  const URL = process.env.REACT_APP_URL;
  const donationsUrl = URL + "/api/donations?status=PENDING";

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full relative flex-1  bg-blue-50  dark:bg-gray-800 overflow-scroll">
        {donationId ? (
          <DonationInfo
            currentDonation={currentDonation}
            setCurrentDonation={setCurrentDonation}
            path="Requests"
          />
        ) : (
          <DonationList
            setCurrentDonation={setCurrentDonation}
            donationsUrl={donationsUrl}
            PageType="Requests"
            baseUrl="/requests"
          />
        )}
      </div>
    </div>
  );
}
export default Index;
