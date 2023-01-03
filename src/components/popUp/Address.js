import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContex } from "../../context/contex";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";

function Address({ setShowAddress, editedData, setEditedData }) {
  /** @type React.MutableRefObject<HTMLInputElement> */
  const searchRef = useRef(null);
  const { userData } = useContext(GlobalContex);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 28.7041,
    lng: 77.1025
  });
  const [address, setAddress] = useState(
    editedData.address ? editedData.address : ""
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_URL_GOOGLE_API_KEY,
    libraries: ["places"]
  });

  useEffect(() => {
    if (editedData.address) handleSearch(editedData.address);
  }, []);

  ///  load current location
  function loadCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        setCenter({
          lat: parseFloat(e.coords.latitude),
          lng: parseFloat(e.coords.longitude)
        });
        getAddress(
          parseFloat(e.coords.latitude),
          parseFloat(e.coords.longitude)
        );
      },
      (error) =>
        setCenter({ lat: parseFloat(28.7041), lng: parseFloat(77.1025) })
    );
  }

  ///  handle search
  function handleSearch(address) {
    // eslint-disable-next-line no-undef
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
      // eslint-disable-next-line no-undef
      if (status === google.maps.GeocoderStatus.OK) {
        setCenter({
          lat: parseFloat(results[0].geometry.location.lat()),
          lng: parseFloat(results[0].geometry.location.lng())
        });
        getAddress(
          parseFloat(results[0].geometry.location.lat()),
          parseFloat(results[0].geometry.location.lng())
        );
      } else {
      }
    });
  }
  /// handle get address from lat , lng
  function getAddress(myLatitude, myLongitude) {
    // eslint-disable-next-line no-undef
    var geocoder = new google.maps.Geocoder(); // create a geocoder object
    // eslint-disable-next-line no-undef
    var location = new google.maps.LatLng(myLatitude, myLongitude); // turn coordinates into an object
    geocoder.geocode({ latLng: location }, function (results, status) {
      // eslint-disable-next-line no-undef
      if (status == google.maps.GeocoderStatus.OK) {
        setAddress(results[0].formatted_address); // if address found, pass to processing function
      } else {
        alert("Geocode failure: " + status); // alert any other error(s)
        return false;
      }
    });
  }

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50  bg-[#000000c7] flex  justify-center items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-full"
      >
        <div className="relative    w-full md:w-fit  md:h-auto shadow-2xl">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={() => {
                setShowAddress(false);
                setAddress("");
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
            <div className="p-6 ">
              <div className="md:w-[50rem]">
                <p className="text-white font-semibold">
                  Address :{" "}
                  <span className=" font-medium text-gray-300">{address}</span>
                </p>{" "}
              </div>

              {/* map */}
              <div className=" my-8 md:w-[50rem] w-full relative ">
                {!isLoaded ? (
                  "loading"
                ) : (
                  <>
                    <GoogleMap
                      mapContainerStyle={{
                        width: "100%",
                        height: "400px"
                      }}
                      center={center}
                      zoom={12}
                      onLoad={(map) => setMap(map)}
                      options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false
                      }}
                    >
                      <Marker
                        position={center}
                        draggable={true}
                        onDragStart={(e) =>
                          getAddress(e.latLng.lat(), e.latLng.lng())
                        }
                      />
                    </GoogleMap>
                    {userData.role === "DONOR" ? (
                      <Autocomplete
                        onPlaceChanged={() =>
                          handleSearch(searchRef.current.value)
                        }
                      >
                        {/* search  */}
                        <div className="flex items-center   absolute  top-0 left-0 bg-white rounded-br-lg  dark:bg-gray-700 p-1">
                          <label htmlFor="simple-search" className="sr-only">
                            Search
                          </label>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="simple-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Search"
                              ref={searchRef}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSearch()}
                            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                            <span className="sr-only">Search</span>
                          </button>
                        </div>
                        {/* search  */}
                      </Autocomplete>
                    ) : null}

                    <div
                      className="absolute bottom-8 right-4  text-blue-600 h-8 w-8 rounded-full hover:bg-blue-500 hover:text-white items-center flex justify-center"
                      onClick={() => {
                        loadCurrentLocation();
                        map.panTo(center);
                      }}
                    >
                      <svg
                        className="w-6 h-6     cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </div>
                  </>
                )}
              </div>
              {/* map */}

              <div className="flex  gap-5    flex-wrap  justify-center items-center">
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={() => {
                    setEditedData((preVal) => {
                      return { ...preVal, address: address };
                    });
                    setShowAddress(false);
                    setAddress("");
                  }}
                >
                  Yes, I'm sure
                </button>
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => {
                    setShowAddress(false);
                    setAddress("");
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
    </>
  );
}

export default Address;
