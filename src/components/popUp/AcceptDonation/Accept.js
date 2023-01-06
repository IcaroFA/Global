import React, { useState } from "react";

// component
import AcceptDonation from "./AcceptDonation";
import SelectAgent from "./SelectAgent";
function Accept({ setDonationData, id }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [component, setComponent] = useState("ACCEPT");
  return (
    <>
      <button
        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-3    py-2.5 text-center mr-2"
        onClick={() => setShowPopUp((preVal) => !preVal)}
      >
        Accepte ✅
      </button>
      {showPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed  p-0  top-0 left-0 right-0 z-50  bg-[#000000c7] flex  justify-center items-center md:p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full"
        >
          {component === "ACCEPT" ? (
            <AcceptDonation
              setComponent={setComponent}
              setShowPopUp={setShowPopUp}
            />
          ) : null}
          {component === "AGENT" ? (
            <SelectAgent
              setShowPopUp={setShowPopUp}
              setComponent={setComponent}
              setDonationData={setDonationData}
              id={id}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default Accept;
