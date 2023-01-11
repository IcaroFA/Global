import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import AssignedDonationList from "./AssignedDonationList";
import DonationInfo from "../../components/DonationInfo";

function Index() {
  const { donationId } = useParams();
  const [currentDonation, setCurrentDonation] = useState({
    page: 1,
    donation: {}
  });

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
          <AssignedDonationList setCurrentDonation={setCurrentDonation} />
        )}
      </div>
    </div>
  );
}
export default Index;
