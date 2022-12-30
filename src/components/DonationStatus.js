import React, { useState, useContext } from "react";
import { GlobalContex } from "../context/contex";
import { useNavigate, useLocation } from "react-router-dom";
function DonationStatus({ item }) {
  const urlQuery = new URLSearchParams(useLocation().search);

  const navigate = useNavigate();
  const { setCurrentDonation } = useContext(GlobalContex);
  const [showFooditems, setShowFoodItems] = useState(
    urlQuery.get("donationId") && urlQuery.get("donationId") == item._id
      ? true
      : false
  );
  return (
    <div className="overflow-x-auto relative shadow-2xl sm:rounded-lg  mb-4 ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption
          className="p-5 text-lg font-semibold text-left     text-gray-900 bg-white dark:bg-gray-800  dark:text-white  cursor-pointer "
          onClick={() => {
            setShowFoodItems((preVal) => !preVal);
            navigate("/status");
          }}
        >
          <div className=" flex-col  md:flex-row  flex   md:gap-8 md-4">
            <div className="flex  md:flex-col gap-4">
              <h1>{new Date(item.createdAt).toDateString()}</h1>
              <p>{item.status}</p>
            </div>
            <p className=" mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse a list of Flowbite products designed to help you work and
              play, stay organized, get answers, keep in touch, grow your
              business, and more.
            </p>
          </div>
        </caption>
        {/* table body */}
        {showFooditems ? (
          <>
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
              {item.items.map((e, i) => {
                return (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
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
          </>
        ) : null}
        {/* table body */}
      </table>
      {showFooditems ? (
        <div className="m-4 flex flex-col gap-4 items-start ">
          <h1 className=" dark:text-white  text-gray-700  font-semibold">
            Address :{" "}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {" "}
              {item.pickUpAddress.country} {item.pickUpAddress.state}{" "}
              {item.pickUpAddress.city} {item.pickUpAddress.street}{" "}
              {item.pickUpAddress.building} {item.pickUpAddress.pinCode}
            </span>
          </h1>
          <button
            type="button"
            className="   py-2 px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              setCurrentDonation(item);
              navigate("/donation");
            }}
          >
            Edit
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default DonationStatus;
