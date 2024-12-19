import React from "react";
import ReportGenerator from "../../Components/OpenAiReport/ReportGenerator";
import Navbar from '../../Components/Navbar';
import Sidebar from '../../Components/sidebar'; 
const OpenAiReport = (props) => {

  return (
        <div>
      <Navbar name={props.name} />
      <div className='flex'>
      <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
        <div className='m-0  md:ml-64  h-full w-full flex-col items-center dark:bg-slate-900'>
           <ReportGenerator/>
        </div>
      </div>
    </div>
  );
};

export default OpenAiReport;
