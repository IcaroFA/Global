import React, { useState, useContext, useEffect } from "react";
import { GlobalContex } from "../context/contex";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.js";
function Donation() {
  const { userData, notify } = useContext(GlobalContex);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [pickupAddress, setPickupAddress] = useState({});
  const [foodItems, setFoodItems] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(userData).length < 1) return navigate("/");
  }, []);

  function handleDropDown(e) {
    const dropdown = e.target.parentElement.lastChild;
    if (!dropdown.className.includes("hidden")) {
      dropdown.className = dropdown.className + " hidden";
    } else {
      dropdown.className = dropdown.className.replace("hidden", "");
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
        <form className="mt-12 md:ml-6" autoComplete="off">
          {/* food Items */}
          <div className="mb-8">
            <h1 className=" text-xl mb-6 font-semibold  text-blue-500   dark:text-white">
              Food Items
            </h1>
            <div>
              <ul>
                <li className="flex md:gap-5 gap-2  flex-wrap ">
                  <input
                    type="text"
                    id="Food Item"
                    className="  max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Food Item"
                    required
                  />
                  <div className="flex gap-3 ">
                    <input
                      type="Number"
                      id="Quantity"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Quantity"
                      required
                    />
                    <div className="relative">
                      <button
                        id="dropdownDefault"
                        data-dropdown-toggle="dropdown"
                        onClick={(e) => handleDropDown(e)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                      >
                        Unit
                      </button>
                      <div
                        id="dropdown"
                        className=" hidden shadow-2xl absolute top-12 z-10 w-24 bg-white rounded divide-y divide-gray-100  dark:bg-gray-700"
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefault"
                        >
                          <li onClick={(e) => {}}>
                            <div className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              Kilo Gram
                            </div>
                          </li>
                          <li>
                            <div className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              Mili Gram
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <!-- unit Dropdown menu --> */}
                  </div>
                </li>
              </ul>
            </div>
            {/* add Items Button */}
            <button
              type="button"
              className="py-2 mt-4 px-3 text-xs font-semibold text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add more
            </button>
            {/* add Items Button  end*/}
          </div>
          {/* food Items end */}

          {/* address */}
          <div>
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
                  value={isSameAddress ? userData.address.country : ""}
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
                  value={isSameAddress ? userData.address.state : ""}
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
                  value={isSameAddress ? userData.address.city : ""}
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
                  value={isSameAddress ? userData.address.street : ""}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={isSameAddress ? userData.address.building : ""}
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
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={isSameAddress ? userData.address.zipCode : ""}
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

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {/* from end */}
      </div>
    </div>
  );
}
export default Donation;
