import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

function Address() {
  const [showAddress, setShowAddress] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_URL_GOOGLE_API_KEY
  });

  const containerStyle = {
    width: "100%",
    height: "400px"
  };
  const center = {
    lat: 28.7041,
    lng: 77.1025
  };

  return (
    <>
      <button type="button" onClick={() => setShowAddress((preval) => !preval)}>
        address
      </button>
      {showAddress ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50  bg-[#000000c7] flex  justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full"
        >
          <div className="relative  md:h-auto shadow-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
                onClick={() => {
                  setShowAddress(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center ">
                {/* map */}
                <div className=" my-8 md:w-[50rem] ">
                  {!isLoaded ? (
                    "loading"
                  ) : (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={10}
                    ></GoogleMap>
                  )}
                </div>
                {/* map */}

                {/* button  */}
                <div className="flex  gap-5    flex-wrap  justify-center items-center">
                  <button
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    // onClick={() => handleLogout()}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      setShowAddress(false);
                    }}
                  >
                    No, cancel
                  </button>
                </div>
                {/* button end */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Address;
