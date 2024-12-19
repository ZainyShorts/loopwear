import React from 'react';
import Fich from '../Components/FetchPatients/Fich.js';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/sidebar.js'; // Make sure the filename matches

const FichPatient = (props) => {
  return (
    <div>
      <Navbar name={props.name} />

      <div className='flex'>
      <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
        <div className='m-0  md:ml-64  h-full w-full flex-col items-center'>
          {/* The 'ml-64' class adds margin to the right to avoid content overlapping with the fixed sidebar */}
          <Fich />
        </div>
      </div>
    </div>
  );
};

export default FichPatient;
