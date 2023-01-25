import React, { useContext } from "react";
import { GlobalContex } from "../context/contex";

function NotificationComponent() {
  const { setShowNotificationComponent } = useContext(GlobalContex);
  return (
    <div className="absolute top-24 right-4  flex flex-col gap-3">
      {/* card */}
      <div className=" max-w-md md:h-auto  shadow-2xl">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-2">
          <h1 className="dark:text-white text-gray-600 font-bold text-xl">
            Collected
          </h1>
          <p className="dark:text-white text-gray-600 font-bold">
            Donation collected by agent Name{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotificationComponent;
