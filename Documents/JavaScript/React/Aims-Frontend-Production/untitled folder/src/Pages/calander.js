import React from 'react';
import { AiOutlineArrowLeft } from "react-icons/ai"; // Importing the back arrow icon
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import Calendar from '../Components/Appointment/calander';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar/sidebar';

const Calender = (props) => {
  const navigate = useNavigate(); // To handle back navigation

  // Function to handle back button click
  const handleBackClick = () => {
    navigate('/AppointmentMenu'); // Navigates to the previous page
  };

  return (
    <div>
      <Navbar name={props.name} />
  
      <div className="flex bg-transparent">
        <div className="fixed h-full top-0 left-0 hidden md:block">
          {/* Sidebar */}
          <Sidebar />
        </div>
  
        <div className="w-full pt-12 md:ml-64 dark:bg-slate-900 flex flex-col justify-center items-center">
          {/* Styled Back Button */}
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-[5px] mr-auto shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out relative bottom-10 md:hidden"
            onClick={handleBackClick} // Navigate back when clicked
          >
            <AiOutlineArrowLeft className="text-2xl" />
            <span className="ml-2 text-lg">Back</span>
          </button>

          {/* Calendar Component */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Calender;
