/* eslint-disable */
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Import back icon from react-icons
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import AppointmentSetup from "../Components/Appointment/AppointmentSetup.js";
import Sidebar from "../Components/sidebar.js";
import Navbar from "../Components/Navbar";

const Appointment = (props) => {
  const navigate = useNavigate(); // To handle back navigation

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/AppointmentMenu'); 
  };

  return (
    <div>
      <Navbar name={props.name} />

      <div className="flex">
        <div className="fixed h-full top-0 left-0 hidden md:block">
          <Sidebar />
        </div>
        <div className="dark:bg-slate-900 md:ml-64 h-full w-full flex-col items-center">
          {/* Back Icon */}
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-[5px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out md:hidden"
            onClick={handleBackClick} // Navigate back when clicked
          >
            <AiOutlineArrowLeft className="text-2xl" />
            <span className="ml-2 text-lg">Back</span>
          </button>

          <AppointmentSetup />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
