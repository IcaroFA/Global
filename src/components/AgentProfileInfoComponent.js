import React from "react";

function AgentProfileInfoComponent({ agent }) {
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      {" "}
      {agent.profileImage ? (
        <img
          src={agent.profileImage.url}
          className="h-20 w-20 rounded-full  object-cover object-center"
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
  );
}

export default AgentProfileInfoComponent;
