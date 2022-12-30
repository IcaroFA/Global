import React, { useState, useContext, useEffect } from "react";
import { GlobalContex } from "../context/contex";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Donation() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL;
  const { userData, notify, currentDonation } = useContext(GlobalContex);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [pickUpAddress, setPickupAddress] = useState({});
  const [message, setMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([
    { _id: uuidv4(), unit: "Kilogram", item: "", quantity: 1 }
  ]);

  useEffect(() => {
    if (Object.keys(userData).length < 1) return navigate("/");
  }, []);

  // toggle same address
  useEffect(() => {
    if (Object.keys(currentDonation).length > 0) {
      return isSameAddress
        ? setPickupAddress(userData.address)
        : setPickupAddress(currentDonation.pickUpAddress);
    }
    isSameAddress
      ? setPickupAddress(userData.address)
      : setPickupAddress({
          country: "",
          state: "",
          city: "",
          street: "",
          building: "",
          pinCode: ""
        });
  }, [isSameAddress]);

  useEffect(() => {
    handleEditState();
  }, [currentDonation]);

  // edit state
  function handleEditState() {
    if (Object.keys(currentDonation).length > 0) {
      setPickupAddress(currentDonation.pickUpAddress);
      setFoodItems(
        currentDonation.items.map((item) => {
          return { ...item, _id: uuidv4() };
        })
      );
      setMessage(currentDonation.message);
    }
  }

  /// axios post and put options
  function axiosOptions() {
    const donationInfo = {
      items: foodItems.map((item) => {
        delete item._id;
        return item;
      }),
      pickUpAddress,
      message
    };
    return Object.keys(currentDonation).length > 0
      ? {
          method: "put",
          url: URL + "/api/donation/" + currentDonation._id,
          withCredentials: true,
          data: donationInfo
        }
      : {
          method: "post",
          url: URL + "/api/donation",
          withCredentials: true,
          data: donationInfo
        };
  }

  // handle from submit
  async function handleSubmitDonation(e) {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const response = await axios(axiosOptions());
      if (response.data.success) {
        notify("successfuly", "success");
        navigate("/status");
      }
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="h-full flex-1 p-4 bg-blue-50  dark:bg-gray-800 overflow-scroll">
        <header className="border-b-4 border-blue-300  dark:border-gray-500 ">
          <h1 className="md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Donation
          </h1>
        </header>

        {/* form  */}
        <form
          className="mt-12 md:ml-6"
          autoComplete="off"
          onSubmit={(e) => handleSubmitDonation(e)}
        >
          {/* food Items */}
          <div className="mb-8">
            <h1 className=" text-xl mb-6 font-semibold  text-blue-500   dark:text-white">
              Food Items
            </h1>
            <div>
              <ul>
                {foodItems.map((item, i) => (
                  <li
                    key={item._id}
                    className="flex md:gap-5 mb-4 gap-2  flex-wrap "
                  >
                    <input
                      type="text"
                      id="Food Item"
                      className="  max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Food Item"
                      required
                      value={
                        foodItems.find((itemObj, index) => i === index).item
                      }
                      onChange={(e) => {
                        setFoodItems((preVal) =>
                          preVal.map((itemObj, index) =>
                            i === index
                              ? {
                                  ...itemObj,
                                  item: e.target.value
                                }
                              : itemObj
                          )
                        );
                      }}
                    />
                    <div className="flex gap-3 ">
                      <input
                        type="Number"
                        id="Quantity"
                        className="bg-gray-50 border w-28 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Quantity"
                        required
                        value={
                          foodItems.find((itemObj, index) => i === index)
                            .quantity
                        }
                        min="1"
                        onChange={(e) => {
                          setFoodItems((preVal) =>
                            preVal.map((itemObj, index) =>
                              i === index
                                ? {
                                    ...itemObj,
                                    quantity: e.target.value
                                  }
                                : itemObj
                            )
                          );
                        }}
                      />
                      <div className="relative">
                        <button
                          id="dropdownDefault"
                          data-dropdown-toggle="dropdown"
                          onClick={() => {
                            setFoodItems((preVal) =>
                              preVal.map((e, index) =>
                                i === index
                                  ? {
                                      ...e,
                                      unit:
                                        e.unit === "Kilogram"
                                          ? "Liter"
                                          : "Kilogram"
                                    }
                                  : e
                              )
                            );
                          }}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                        >
                          {item.unit}
                        </button>
                      </div>
                      {/* <!-- unit Dropdown menu --> */}
                      {/* remove  */}
                      {i !== 0 && (
                        <button
                          className="py-2  px-3 text-xs font-semibold text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          onClick={() =>
                            setFoodItems(
                              foodItems.filter((e, index) => index !== i)
                            )
                          }
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                      {/* remove  end */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* add Items Button */}
            <button
              type="button"
              onClick={() =>
                setFoodItems((preVal) => [
                  ...preVal,
                  { _id: uuidv4(), unit: "Kilogram", item: "", quantity: 1 }
                ])
              }
              className="py-2 mt-4 px-3 text-xs font-semibold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add more
            </button>
            {/* add Items Button  end*/}
          </div>
          {/* food Items end */}

          {/* address */}
          <div className="mb-8">
            <h1 className=" text-xl mb-6 font-semibold  text-blue-500   dark:text-white">
              PickUp Address
            </h1>
            <div className="flex items-center flex-wrap md:gap-6 justify-start w-full">
              {/* countru */}
              <div className="md:mb-6  mb-3 w-full md:w-60">
                <label
                  htmlFor="Country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="Country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Country"
                  required
                  onChange={(e) =>
                    setPickupAddress((preVal) => {
                      return { ...preVal, country: e.target.value };
                    })
                  }
                  value={pickUpAddress.country ? pickUpAddress.country : ""}
                  autoComplete="off"
                  disabled={isSameAddress}
                  style={
                    isSameAddress
                      ? { background: "rgba(125, 125, 125, 0.3)" }
                      : null
                  }
                />
              </div>{" "}
              {/* country  end */}
              {/* State */}
              <div className="md:mb-6  mb-3 w-full md:w-60">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="State"
                  required
                  onChange={(e) =>
                    setPickupAddress((preVal) => {
                      return { ...preVal, state: e.target.value };
                    })
                  }
                  value={pickUpAddress.state ? pickUpAddress.state : ""}
                  disabled={isSameAddress}
                  style={
                    isSameAddress
                      ? { background: "rgba(125, 125, 125, 0.3)" }
                      : null
                  }
                />
              </div>
              {/* State end */}
              {/* city */}
              <div className="md:mb-6  mb-3 w-full md:w-60">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) =>
                    setPickupAddress((preVal) => {
                      return { ...preVal, city: e.target.value };
                    })
                  }
                  value={pickUpAddress.city ? pickUpAddress.city : ""}
                  placeholder="City"
                  disabled={isSameAddress}
                  style={
                    isSameAddress
                      ? { background: "rgba(125, 125, 125, 0.3)" }
                      : null
                  }
                />
              </div>
              {/* city end */}
              {/* street     */}
              <div className="mb-6 w-full md:w-[24rem]">
                <label
                  htmlFor="street"
                  className="block mb-2   text-sm font-medium text-gray-900 dark:text-white"
                >
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  className="bg-gray-50 border w-full  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) =>
                    setPickupAddress((preVal) => {
                      return { ...preVal, street: e.target.value };
                    })
                  }
                  value={pickUpAddress.street ? pickUpAddress.street : ""}
                  placeholder="Street"
                  autoComplete="off"
                  disabled={isSameAddress}
                  style={
                    isSameAddress
                      ? { background: "rgba(125, 125, 125, 0.3)" }
                      : null
                  }
                />
              </div>
              {/* street end */}
              {/* building     */}
              <div className="md:mb-6  mb-3 w-full md:w-60">
                <label
                  htmlFor="Building"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Building
                </label>
                <input
                  type="text"
                  id="Building"
                  onChange={(e) =>
                    setPickupAddress((preVal) => {
                      return { ...preVal, building: e.target.value };
                    })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={pickUpAddress.building ? pickUpAddress.building : ""}
                  placeholder="Apt, office, suite, etc. (Optional)"
                  disabled={isSameAddress}
                  style={
                    isSameAddress
                      ? { background: "rgba(125, 125, 125, 0.3)" }
                      : null
                  }
                />
              </div>
              {/* building end */}
              {/* building     */}
              <div className="md:mb-6  mb-3 w-full md:w-60">
                <label
                  htmlFor="zip"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pin Code
                </label>
                <input
                  type="number"
                  id="zip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) =>
                    setPickupAddress((preVal) => {
                      return { ...preVal, pinCode: e.target.value };
                    })
                  }
                  value={pickUpAddress.pinCode ? pickUpAddress.pinCode : ""}
                  disabled={isSameAddress}
                  style={
                    isSameAddress
                      ? { background: "rgba(125, 125, 125, 0.3)" }
                      : null
                  }
                />
              </div>
              {/* building end */}
              {/* same address toggle */}
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => setIsSameAddress((preVal) => !preVal)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm    font-semibold text-gray-900 dark:text-gray-300">
                  Your Address
                </span>
              </label>
              {/* same address toggle end */}
            </div>
          </div>
          {/* address end */}
          {/* message */}
          <div className="mb-8">
            <label
              htmlFor="message"
              className=" text-xl  font-semibold  text-blue-500   dark:text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="3"
              className="block p-2.5    w-full mt-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          {/* message emd */}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {Object.keys(currentDonation) > 0 ? "Submit" : "Update"}

            {submitLoading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline ml-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : null}
          </button>
          {/* cancle reset button */}
          {Object.keys(currentDonation).length > 0 ? (
            <>
              <button
                type="button"
                onClick={() =>
                  navigate("/status?donationId=" + currentDonation._id)
                }
                className="text-white mx-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Cancle
              </button>{" "}
              <button
                type="button"
                onClick={() => handleEditState()}
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Reset
              </button>
            </>
          ) : null}
          {/* cancle reset button */}
        </form>
        {/* from end */}
      </div>
    </div>
  );
}
export default Donation;
