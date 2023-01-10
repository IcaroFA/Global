import React, { useState } from "react";
import Sidebar from "../../components/Sidebar.js";
import { useLocation, useParams, Link } from "react-router-dom";
import AgentInfo from "./AgentInfo.js";
import AgentList from "./AgentList.js";
import Search from "../../components/Search.js";

function Agents() {
  const [currentAgent, setCurrentAgent] = useState("");
  const { agentId } = useParams();
  return (
    <div className="flex  h-full md:gap-1">
      <Sidebar />
      <div className="scroll h-full  relative flex-1 bg-blue-50  dark:bg-gray-800 overflow-scroll ">
        {agentId ? (
          <AgentInfo
            currentAgent={currentAgent}
            setCurrentAgent={setCurrentAgent}
          />
        ) : (
          <AgentList setCurrentAgent={setCurrentAgent} />
        )}
      </div>
    </div>
  );
}

export default Agents;
