import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import AssignedDonationInfo from "./AssignedDonationInfo";
import AssignedDonationList from "./AssignedDonationList";

function Index() {
  const { donationId } = useParams();
  const [currentDonation, setCurrentDonation] = useState({});

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full relative flex-1  bg-blue-50  dark:bg-gray-800 overflow-scroll">
        {donationId ? (
          <AssignedDonationInfo
            currentDonation={currentDonation}
            setCurrentDonation={setCurrentDonation}
          />
        ) : (
          <AssignedDonationList setCurrentDonation={setCurrentDonation} />
        )}
      </div>
    </div>
  );
}
export default Index;
