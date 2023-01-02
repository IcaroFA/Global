import React, { useState, useContext, useEffect, useRef } from "react";
import { GlobalContex } from "../context/contex.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// component
import Address from "../components/popUp/Address.js";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import useForgotPassword from "../customHooks/userForgotPassword.js";

import DarkModeToggleButton from "../components/DarkModeToggleButton.js";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

function Profile() {
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const { notify, userData } = useContext(GlobalContex);
  const [isEdit, setIsEdit] = useState(false);
  const URL = process.env.REACT_APP_URL;
  const [address, setAddress] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  const [inputImage, setInputtImage] = useState({ base64: "", file: "" });
  const reader = new FileReader();
  const { data, loading, error, forgot } = useForgotPassword(userData.email);
  const [reset, setReset] = useState({ data, error, loading });
  useEffect(() => {
    if (Object.keys(userData).length < 1) return navigate("/");
  }, []);

  reader.addEventListener(
    "load",
    () => {
      setInputtImage((preVal) => {
        return {
          ...preVal,
          base64: reader.result
        };
      });
    },
    false
  );

  async function handleSelect(address) {
    try {
      const response = await geocodeByAddress(address);
      const latlng = await getLatLng(response[0]);
      console.log(latlng);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (error) notify(error.response.data.message, "error");
    if (data) notify(data.message, "success");
    setReset({ data, error, loading });
  }, [data, error, loading]);

  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="h-full relative flex-1 p-4 bg-blue-50  dark:bg-gray-800 overflow-scroll">
        <header className="md:block    hidden   border-b-4    border-blue-300  dark:border-gray-500 ">
          <h1 className="   text-xl md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Profile
          </h1>
        </header>

        {/* profile body */}
        {isEdit ? (
          <form>
            <div className="flex  pt-4   md:gap-10    md:flex-row         flex-col items-center ">
              {/* profile image */}
              <div className="relative">
                {inputImage.base64 ? (
                  <img
                    src={inputImage.base64}
                    className="w-44 h-44 rounded-full"
                    alt="img"
                  />
                ) : (
                  <svg
                    className="w-48 h-48 text-gray-200 dark:text-gray-700"
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
                {/* edit button */}
                <div
                  onClick={() => console.log(imageInputRef.current.click())}
                  className="absolute text-sm bottom-5 left-[8rem]  h-9 w-9 rounded-full cursor-pointer  hover:shadow-2xl    bg-blue-200  hover:bg-blue-100 dark:bg-[#9885855d] dark:hover:bg-[#98858526] flex items-center  justify-center"
                >
                  <svg
                    className="w-6 h-6 text-blue-500   dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </div>
                {/* edit button end */}
              </div>
              {/* profile image  end*/}
              <div className="md:w-fit w-full    md:mt-0   mt-8 ">
                {/* first name */}
                <div className="mb-3  flex  md:block">
                  <label
                    htmlFor="email"
                    className="md:block  mb-2   md:mr-0 mr-4 md:text-sm  text-lg font-semibold text-gray-800 dark:text-white flex items-center"
                  >
                    firstName
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                    defaultValue={userData.firstName}
                  />
                </div>
                {/* firstname end */}
                {/* lastName */}
                <div className="mb-3  flex  md:block">
                  <label
                    htmlFor="lastname"
                    className="md:block   md:mr-0 mr-4  flex items-center  mb-2 md:text-sm  text-lg font-semibold text-gray-800 dark:text-white"
                  >
                    LastName
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    defaultValue={userData.lastName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                {/* lastName end */}
              </div>
            </div>

            <div className="  md:mt-10 mt-0   md:ml-8    ">
              {/* phone no */}
              <div className="mb-3 flex items-center gap-4  ">
                <label
                  htmlFor="phoneNo"
                  className="block   mb-2 text-lg font-semibold text-gray-800 dark:text-white"
                >
                  PhoneNo
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="0000000000"
                  id="phoneNo"
                  className="md:w-fit  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  defaultValue={userData.phoneNo}
                />
              </div>
              {/* phone no  end */}
              {/* address  */}
              <div className="mb-3 flex items-center gap-4">
                <label
                  htmlFor="address"
                  className="block   mb-2 text-lg font-semibold text-gray-800 dark:text-white"
                >
                  Address
                </label>
                <Address />
              </div>
              {/* address end */}
              {/* password  reset password */}
              <div className="mb-3 flex items-center gap-4  ">
                <label
                  htmlFor="lastname"
                  className="md:block   md:mr-0 mr-4  flex items-center  mb-2 md:text-sm  text-lg font-semibold text-gray-800 dark:text-white"
                >
                  reset Password
                </label>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => forgot()}
                >
                  resetPassword
                  {reset.loading ? (
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
              </div>
              {/* password  reset password */}
            </div>
          </form>
        ) : (
          // userInfo
          <div>
            <div className="relative flex justify-center items-center flex-col">
              {/* edit butotn */}
              <div
                className="absolute   right-8  md:top-6  top-3   h-9 w-9 rounded-full cursor-pointer  hover:shadow-2xl hover:bg-[#98858526] flex items-center  justify-center"
                onClick={() => setIsEdit(true)}
              >
                <svg
                  className="w-6 h-6 text-blue-500   dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </div>
              {/* edit butotn  end*/}

              {/* profile image */}
              <div className="relative">
                <svg
                  className="w-40 h-40 text-gray-200 dark:text-gray-700"
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
                <p className="absolute text-sm bottom-5 left-24 h-6 w-[4rem] flex items-center justify-center bg-blue-500  text-white font-semibold rounded-3xl">
                  {userData.role}
                </p>
              </div>
              {/* profile image  end*/}

              {/* name email */}
              <div className="text-center  ">
                <p className="text-xl text-blue-500    font-semibold  dark:text-gray-100">
                  {" "}
                  {userData.firstName + " " + userData.lastName}
                </p>
                <p className="text-blue-500   dark:text-gray-300">
                  {userData.email}
                </p>
              </div>
              {/* name email end */}
            </div>

            <div className="mt-12">
              <h1 className="text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white">
                PhoneNo :{" "}
                <span className="text-lg  font-semibold text-gray-500">
                  {userData.phoneNo}
                </span>
              </h1>
              <div className="text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white flex">
                Address <br />{" "}
                <div className="mt-8">
                  <p>
                    <span className="text-lg  font-semibold text-gray-500">
                      country :
                    </span>
                    <span className="text-lg  font-medium text-gray-500">
                      {" "}
                      {userData.address.country}
                    </span>
                  </p>
                  <p>
                    <span className="text-lg  font-semibold text-gray-500">
                      State :
                    </span>
                    <span className="text-lg  font-medium text-gray-500">
                      {" "}
                      {userData.address.state}
                    </span>
                  </p>
                  <p>
                    <span className="text-lg  font-semibold text-gray-500">
                      City :
                    </span>
                    <span className="text-lg  font-medium text-gray-500">
                      {" "}
                      {userData.address.city}
                    </span>
                  </p>
                  <p>
                    <span className="text-lg  font-semibold text-gray-500">
                      pinCode :
                    </span>
                    <span className="text-lg  font-medium text-gray-500">
                      {" "}
                      {userData.address.pinCode}
                    </span>
                  </p>
                </div>
              </div>
              <h1 className="text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white">
                Password :
                <span className="text-lg  font-semibold text-gray-500">
                  {" "}
                  xxxxxxxx
                </span>
              </h1>
              <h1 className=" md:hidden text-xl md:text-xl mb-3 font-semibold  text-blue-500   dark:text-white">
                Theme :
                <DarkModeToggleButton />
              </h1>
            </div>
          </div>
          // userInfo end
        )}
      </div>
      <input
        type="file"
        ref={imageInputRef}
        className="hidden"
        accept=".png, .jpg, .jpeg"
        onChange={(e) => {
          setInputtImage((preVal) => {
            return {
              ...preVal,
              file: e.target.files[0]
            };
          });
          reader.readAsDataURL(e.target.files[0]);
        }}
      />
    </div>
  );
}
export default Profile;
