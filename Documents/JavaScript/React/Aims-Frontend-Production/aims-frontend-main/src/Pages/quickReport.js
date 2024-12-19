import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/sidebar'; 
import QuickReportView from '../Components/ConsultationOptions/QuickReportView';

const UploadAudio = (props) => {
  return (
    <div>
      <Navbar name={props.name} />

      <div className='flex'>
      <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
        <div className='m-0  md:ml-64  h-full w-full flex-col items-center dark:bg-slate-900'>
          {/* The 'ml-64' class adds margin to the right to avoid content overlapping with the fixed sidebar */}
          <QuickReportView/>
        </div>
      </div>
    </div>
  );
};

export default UploadAudio;
