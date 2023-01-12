import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContex } from "../context/contex";

function Sidebar() {
  const { showSideBar, setShowSideBar, setShowLogoutPopUp, userData } =
    useContext(GlobalContex);
  const location = useLocation();
  useEffect(() => {
    window.screen.width > 768 ? setShowSideBar(true) : setShowSideBar(false);
  }, [window.screen.width]);

  return (
    <>
      {showSideBar ? (
        <div className="relative">
          <aside
            className="w-64  h-full shadow-3xl   md:relative     md:top-0    absolute  z-50 left-0 top-0   md:z-0  "
            aria-label="Sidebar     "
          >
            <div className="overflow-y-auto h-full py-4 px-3 bg-gray-50   dark:bg-gray-800">
              <ul className="space-y-2  border-b pb-5 border-gray-200 dark:border-gray-700">
                {/* donations */}
                <li>
                  <Link
                    to="/donations"
                    className={
                      location.pathname === "/donations"
                        ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                        : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3">Donations</span>
                  </Link>
                </li>
                {/* donations end */}
                {/* Assigned */}
                {userData.role === "AGENT" ? (
                  <li>
                    <Link
                      to="/assigned"
                      className={
                        location.pathname === "/assigned"
                          ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                          : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                      </svg>
                      <span className="ml-3">Assigned</span>
                    </Link>
                  </li>
                ) : null}
                {/* assigned */}
                {/* requests */}
                {userData.role === "ADMIN" ? (
                  <li>
                    <Link
                      to="/requests"
                      className={
                        location.pathname === "/requests"
                          ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                          : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Requests
                      </span>
                    </Link>
                  </li>
                ) : null}
                {/* requestts end */}
                {/*   agents */}
                {userData.role === "ADMIN" ? (
                  <li>
                    <Link
                      to="/agents"
                      className={
                        location.pathname === "/agents"
                          ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                          : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Agents
                      </span>
                    </Link>
                  </li>
                ) : null}
                {/*  agents end */}
                {/* donate */}
                {userData.role === "DONOR" ? (
                  <li>
                    <Link
                      to="/donate"
                      className={
                        location.pathname === "/donate"
                          ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                          : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Donate
                      </span>
                    </Link>
                  </li>
                ) : null}
                {/* donate */}
                {/* Status */}
                {userData.role === "DONOR" ? (
                  <li>
                    <Link
                      to="/status"
                      className={
                        location.pathname === "/status"
                          ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                          : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Status
                      </span>
                    </Link>
                  </li>
                ) : null}
                {/* Status end */}
                {/* add agent */}
                {userData.role === "ADMIN" ? (
                  <li>
                    <Link
                      to="/add_agent"
                      className={
                        location.pathname === "/add_agent"
                          ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                          : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Add Agent
                      </span>
                    </Link>
                  </li>
                ) : null}

                {/* add agent end */}
                {/* profile  */}
                <li>
                  <Link
                    to="/profile"
                    className={
                      location.pathname === "/profile"
                        ? "flex items-center p-2 text-base font-normal text-blue-600 rounded-lg dark:text-white bg-blue-100 dark:bg-gray-700"
                        : "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Profile
                    </span>
                  </Link>
                </li>
                {/* profile end */}
                {/* logout */}
                <li>
                  <div
                    className=" cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setShowLogoutPopUp(true);
                    }}
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Log Out
                    </span>
                  </div>
                </li>
                {/* logout end */}
              </ul>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
