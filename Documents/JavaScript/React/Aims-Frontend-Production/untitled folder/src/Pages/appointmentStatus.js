/* eslint-disable */
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Importing the back arrow icon
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import AppointmentStatus from "../Components/Appointment/AppointmentStatus.js";
import Sidebar from "../Components/Sidebar/sidebar.js";
import Navbar from "../Components/Navbar";

const Appointment = (props) => {
  const navigate = useNavigate(); // To handle back navigation

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/AppointmentMenu'); // Navigates to the previous page
  };

  return (
    <div>
      <Navbar name={props.name} />

      <div className="flex">
        <div className="fixed h-full top-0 left-0 hidden md:block">
          <Sidebar />
        </div>
        <div className="dark:bg-slate-900 md:ml-64 h-full w-full flex-col items-center">
          {/* Styled Back Button */}
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-[5px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out mb-4 md:hidden"
            onClick={handleBackClick} // Navigate back when clicked
          >
            <AiOutlineArrowLeft className="text-2xl" />
            <span className="ml-2 text-lg">Back</span>
          </button>

          {/* Appointment Status Component */}
          <AppointmentStatus />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
