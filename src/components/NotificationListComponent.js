import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContex } from "../context/contex";

function NotificationListComponent({ notification }) {
  const navigate = useNavigate();
  const { setShowNotificationComponent } = useContext(GlobalContex);

  async function handleNotification() {
    navigate("/donations/" + notification.donationId);
    setShowNotificationComponent(false);
  }

  if (notification.donationStatus === "COLLECTED") {
    return (
      <div
        className=" max-w-md md:h-auto rounded-lg cursor-pointer"
        style={{ boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px" }}
        onClick={() => {
          handleNotification();
        }}
      >
        <div className="relative bg-white rounded-lg  dark:bg-gray-700 p-4">
          <span className="flex    items-end gap-2">
            <p className=" font-bold text-blue-500 text-xl">
              {notification.donationStatus}
            </p>
            <p className=" dark:text-white text-gray-500  pb-1 font-thin text-xs">
              {notification.donationId}
            </p>
          </span>
          <p className="dark:text-gray-400 text-gray-600  font-thin">
            {notification.donorName}'s donation collected by Agent{" "}
            {notification.agentName}
          </p>
        </div>
      </div>
    );
  }
}

export default NotificationListComponent;
