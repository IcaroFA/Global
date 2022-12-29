import React from "react";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex  h-full">
      <Sidebar />
      <div className="h-full flex-1 p-4 bg-blue-50  dark:bg-gray-700">
        <header className="border-b-4 border-blue-300  dark:border-gray-500 ">
          <h1 className="md:text-2xl mb-3 font-semibold  text-blue-500   dark:text-white">
            Dashboard
          </h1>
        </header>
      </div>
    </div>
  );
}
export default Dashboard;
