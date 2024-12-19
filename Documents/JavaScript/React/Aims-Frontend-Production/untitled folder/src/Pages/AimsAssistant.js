import React from 'react';
import Sidebar from "../Components/Sidebar/sidebar.js";
import Aimsassistant from '../Components/Aims-assistant/Aimsassistant.js';
import AimsNavbar from '../Components/Aims-assistant/AimsNavbar.js';

const AimsAssistant = (props) => {
  return (
    <div>
      {/* Make the navbar fixed */}
    <div className="fixed w-full z-10">
    <AimsNavbar name={props.name} />
  </div>
      <div className="flex">
        <div className="fixed h-full top-0 left-0 hidden md:block">
          <Sidebar />
        </div>
        {/* Adjust content to account for the fixed navbar */}
        <div className="md:ml-64 h-full w-full flex-col items-center">
          <Aimsassistant />
        </div>
      </div>
    </div>
  );
};

export default AimsAssistant;
