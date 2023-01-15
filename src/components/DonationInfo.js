import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetchData from "../customHooks/useFetchData";
import { GlobalContex } from "../context/contex";
import loadingSvg from "../asset/loading.svg";
import Address from "./popUp/Address.js";
import RemoveRejectDonation from "./popUp/Remove.Reject.collected.Donation.js";
import Accept from "./popUp/AcceptDonation/Accept.js";
function DonationInfo({ currentDonation, setCurrentDonation, path }) {
  const navigate = useNavigate();
  const { notify, userData } = useContext(GlobalContex);
  const { donationId } = useParams();
  const [showAddress, setShowAddress] = useState(false);

  const URL = process.env.REACT_APP_URL;
  const { loading, error, data, fetchData } = useFetchData();
  const url = `${URL}/api/donation/${donationId}`;

  useState(() => {
    if (Object.keys(currentDonation.donation).length < 1) fetchData(url);
  }, []);

  useEffect(() => {
    if (!loading && Object.keys(currentDonation.donation).length < 1) {
      setCurrentDonation((preVal) => {
        return {
          ...preVal,
          donation: data
        };
      });
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      navigate("/donations?page=" + currentDonation.page);
      notify(error, "error");
    }
  }, [error]);

  return (
    <>
      <header className="  px-4 pt-4    border-b-4    border-blue-300  dark:border-gray-500 ">
        <h1 className="    text-lg md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
          <Link
            to={`/${path.toLowerCase()}?page=${currentDonation.page}`}
            className=" hover:text-blue-500"
          >
            {path}
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
            <div className="md:p-6  p-4  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex   md:flex-row flex-col md:gap-20  gap-5 ">
                {/* donor details */}
                <div className="flex  flex-col  md:flex-row ">
                  {/* image */}
                  <div className="flex items-center     gap-5">
                    {currentDonation.donation.donorImage ? (
                      <img
                        src={currentDonation.donation.donorImage}
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
                        {currentDonation.donation.donorName}
                      </p>
                      <p className="font-semibold  dark:text-gray-400 text-gray-700">
                        {currentDonation.donation.donorEmail}
                      </p>
                      <p className="font-semibold  dark:text-gray-400 text-gray-700 text-sm">
                        {currentDonation.donation.donorPhoneNo}
                      </p>
                      <p className="font-semibold  dark:text-gray-400 text-gray-700 text-sm">
                        {new Date(
                          currentDonation.donation.createdAt
                        ).toDateString()}
                      </p>
                    </span>
                  </div>
                </div>
                {/* donor details  end*/}

                {/* agent details */}
                {userData.role !== "AGENT" &&
                (currentDonation.donation.status === "ACCEPTED" ||
                  currentDonation.donation.status === "ACCEPTED") ? (
                  <div className="mt-4">
                    <h1 className="text-lg  font-semibold  dark:text-white text-gray-800">
                      Agent Details
                    </h1>
                    <div className="flex items-center  mt-2 gap-3">
                      <div>
                        {currentDonation.donation.agentImage ? (
                          <img
                            src={currentDonation.donation.agentImage}
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
                      </div>
                      <div>
                        <p className="ml-4 font-semibold  dark:text-gray-400 text-gray-700 text-sm">
                          {currentDonation.donation.agentName}
                        </p>
                        <p className="ml-4 font-semibold  dark:text-gray-400 text-gray-700 text-sm">
                          {currentDonation.donation.agentEmail}
                        </p>
                        <p className="ml-4 font-semibold  dark:text-gray-400 text-gray-700 text-sm">
                          {currentDonation.donation.agentPhoneNo}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                {/* agentDetail end */}
              </div>

              <div className=" mt-4   flex flex-col gap-3">
                {/* message */}
                <span className="flex  md:flex-row flex-col ">
                  <p className=" text-md font-semibold  dark:text-white text-gray-800">
                    message:
                  </p>
                  <p className="dark:text-white text-gray-800 ">
                    {currentDonation.donation.message}
                  </p>
                </span>

                {/* message */}
                {/* donation status */}
                <p
                  className={`${
                    (currentDonation.donation.status === "PENDING" &&
                      "text-yellow-400") ||
                    (currentDonation.donation.status === "ACCEPTED" &&
                      "text-green-500") ||
                    (currentDonation.donation.status === "REJECTED" &&
                      "text-red-500") ||
                    (currentDonation.donation.status === "COLLECTED" &&
                      "text-blue-500")
                  }
                   font-bold
                  `}
                >
                  {currentDonation.donation.status === "ACCEPTED" &&
                  (userData.role === "ADMIN" || userData.role === "AGENT")
                    ? "ASSIGNED"
                    : currentDonation.donation.status}
                </p>
                {/* donation status end */}

                {/* pick up address */}
                <span className="flex items-center">
                  <p className=" text-md font-semibold  dark:text-white text-gray-800">
                    {" "}
                    Pickup Address :{" "}
                  </p>
                  <p className=" ml-2  text-md font-medium  dark:text-gray-400 text-gray-700">
                    {" "}
                    {currentDonation.donation.pickUpAddress}
                  </p>
                </span>
                {/* pick up address  end*/}

                {userData.role === "AGENT" ? (
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
                ) : null}

                {/* functionals buttons */}
                <div className="w-full   flex items-center justify-end">
                  {userData.role === "DONOR" &&
                  currentDonation.donation.status === "PENDING" ? (
                    <>
                      <button
                        type="button"
                        className="   py-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => {
                          navigate(
                            "/donate?edit=" + currentDonation.donation._id
                          );
                        }}
                      >
                        Edit
                      </button>
                      <RemoveRejectDonation
                        id={currentDonation.donation._id}
                        setDonationData={setCurrentDonation}
                        type="Remove"
                        redirectPath={`/${path.toLowerCase()}?page=${
                          currentDonation.page
                        }`}
                      />
                    </>
                  ) : null}
                  {/* reject ,accept button form admin */}
                  {userData.role === "ADMIN" &&
                  currentDonation.donation.status === "PENDING" ? (
                    <>
                      {/* accept donation */}
                      <Accept
                        id={currentDonation.donation._id}
                        setCurrentDonation={setCurrentDonation}
                      />
                      {/* accept donation  end*/}
                      {/* reject donation */}
                      <RemoveRejectDonation
                        id={currentDonation.donation._id}
                        setCurrentDonation={setCurrentDonation}
                        type="REJECTED"
                      />
                      {/* reject donation end */}
                    </>
                  ) : null}
                  {/* reject accept button form admin  end*/}

                  {userData.role === "AGENT" &&
                  currentDonation.donation.status === "ACCEPTED" ? (
                    <RemoveRejectDonation
                      id={currentDonation.donation._id}
                      setCurrentDonation={setCurrentDonation}
                      type="COLLECTED"
                    />
                  ) : null}
                </div>
                {/* functionals buttons */}
              </div>
            </div>
            {/* donation info */}
            {/* table */}
            <p className="my-4  dark:text-white  text-gray-800    font-semibold text-lg">
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
                  {Object.keys(currentDonation.donation).length > 0 &&
                    currentDonation.donation.items.map((e, i) => {
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
          data={currentDonation.donation.pickUpAddress}
          type="DIRECTION"
        />
      ) : null}
    </>
  );
}

export default DonationInfo;
