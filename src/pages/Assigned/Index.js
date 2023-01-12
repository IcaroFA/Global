import React, { useState, useContext } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import DonationInfo from "../../components/DonationInfo";
import DonationList from "../../components/donationLists";
import { GlobalContex } from "../../context/contex";

function Index() {
  const { userData } = useContext(GlobalContex);
  const { donationId } = useParams();
  const [currentDonation, setCurrentDonation] = useState({
    page: 1,
    donation: {}
  });
  const URL = process.env.REACT_APP_URL;
  const donationsUrl = `${URL}/api/donations?agentId=${userData._id}&status=ACCEPTED`;

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full relative flex-1  bg-blue-50  dark:bg-gray-800 overflow-scroll">
        {donationId ? (
          <DonationInfo
            currentDonation={currentDonation}
            setCurrentDonation={setCurrentDonation}
            path="Assigned"
          />
        ) : (
          <DonationList
            setCurrentDonation={setCurrentDonation}
            donationsUrl={donationsUrl}
            PageType="Assigned"
            baseUrl="/assigned"
          />
        )}
      </div>
    </div>
  );
}
export default Index;
