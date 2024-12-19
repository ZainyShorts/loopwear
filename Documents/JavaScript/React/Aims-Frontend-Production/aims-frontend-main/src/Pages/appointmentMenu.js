/*eslint-disable*/
import React, { useState } from "react";
import AppointmentMenu from "../Components/Appointment/AppointmentMenu.js";
import Sidebar from '../Components/sidebar.js';
import Navbar from '../Components/Navbar';
const AppointmentMenuPage = (props) => {
  
  

  return (
    <div>

    <Navbar name={props.name} />

  <div className='flex dark:bg-slate-900'>
  <div className='fixed h-full top-0 left-0 hidden md:block '>
  <Sidebar />
</div>
    <div className='dark:bg-slate-900  md:ml-64 h-full w-full flex-col items-center'>
      {/* The 'ml-64' class adds margin to the right to avoid content overlapping with the fixed sidebar */}
      <AppointmentMenu />
    </div>
  </div>
</div>
  );
};

export default AppointmentMenuPage;
