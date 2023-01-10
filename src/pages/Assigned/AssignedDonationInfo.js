import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
import { GlobalContex } from "../../context/contex";
import loadingSvg from "../../asset/loading.svg";
import Address from "../../components/popUp/Address.js";
function AssignedDonationInfo({ currentDonation, setCurrentDonation }) {
  const { notify } = useContext(GlobalContex);
  const { donationId } = useParams();
  const [showAddress, setShowAddress] = useState(false);

  const URL = process.env.REACT_APP_URL;
  const { loading, error, data, fetchData } = useFetchData();
  const url = `${URL}/api/donation/${donationId}`;

  useState(() => {
    if (Object.keys(currentDonation).length < 1) fetchData(url);
  }, []);

  useEffect(() => {
    if (!loading && Object.keys(currentDonation).length < 1) {
      setCurrentDonation(data);
    }
  }, [loading]);

  useState(() => {
    notify(error, "error");
  }, [error]);

  return (
    <>
      <header className="  px-4 pt-4    border-b-4    border-blue-300  dark:border-gray-500 ">
        <h1 className="    text-lg md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
          <Link to="/assigned" className=" hover:text-blue-500">
            Assigned donations
          </Link>
          {" / " + donationId}
        </h1>
      </header>

      <div className="md:p-4  p-2">
        {loading ? (
          <div className="  top-0   left-0  absolute w-full  items-center flex justify-center  h-full">
            <img src={loadingSvg} />
          </div>
        ) : (
          <>
            {/* daonation info */}
            <div className="md:p-6  p-2  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex  flex-col  md:flex-row md:gap-10  gap-5">
                <div className="flex items-center     gap-5">
                  {/* image */}
                  {currentDonation.donorImage ? (
                    <img
                      src={currentDonation.donorImage}
                      className="h-20 w-20 rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <svg
                      className="w-14 h-14 text-gray-200 dark:text-gray-700"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                  {/* image end */}
                  <span>
                    <p className="  text-lg  font-semibold  dark:text-white text-gray-800">
                      {currentDonation.donorName}
                    </p>
                    <p className="font-semibold  dark:text-gray-400 text-gray-700">
                      {currentDonation.donorEmail}
                    </p>
                    <p className="font-semibold  dark:text-gray-400 text-gray-700">
                      {new Date(currentDonation.createdAt).toDateString()}
                    </p>
                  </span>
                </div>
                <p className="text-white ">{currentDonation.message}</p>
              </div>
              <div className=" mt-4   flex flex-col gap-3">
                <p
                  className={
                    (currentDonation.status === "PENDING" &&
                      " text-yellow-400    font-bold") ||
                    (currentDonation.status === "ACCEPTED" &&
                      "text-green-500 font-bold")
                  }
                >
                  {currentDonation.status}
                </p>
                <span className="flex items-center">
                  <p className="  font-semibold  dark:text-white text-gray-800">
                    {" "}
                    PickUpAddress :{" "}
                  </p>
                  <p className=" ml-2  font-medium  dark:text-gray-400 text-gray-700">
                    {" "}
                    {currentDonation.pickUpAddress}
                  </p>
                </span>
                <span className="flex items-center    gap-4">
                  <p className="  font-semibold  dark:text-white text-gray-800">
                    {" "}
                    Direction :{" "}
                  </p>

                  <div
                    className=" h-8 w-18 rounded-full flex items-center   cursor-pointer justify-center  hover:bg-[#8b8b8b63]"
                    onClick={() => setShowAddress(true)}
                  >
                    <svg
                      aria-hidden="true"
                      className=" w-8 h-8  text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </span>
              </div>
            </div>
            {/* donation info */}
            {/* table */}
            <p className="my-4  text-white   font-semibold text-lg">
              Food Items
            </p>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg  ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Item
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Quantity
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(currentDonation).length > 0 &&
                    currentDonation.items.map((e, i) => {
                      return (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={i}
                        >
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {e.item}
                          </th>
                          <td className="py-4 px-6">{e.quantity}</td>
                          <td className="py-4 px-6">{e.unit}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {/* table end */}
          </>
        )}
      </div>

      {showAddress ? (
        <Address
          setShowAddress={setShowAddress}
          data={currentDonation.pickUpAddress}
          type="DIRECTION"
        />
      ) : null}
    </>
  );
}

export default AssignedDonationInfo;
