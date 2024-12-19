import React, { useState } from 'react';
import UploadAudioCompo from "../Components/ConsultationOptions/Uploadaudio";
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar/sidebar';  
import { useContext } from 'react'; 
import { GlobalStateContext } from '../Context/GlobalStateContext'; 
import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
const UploadAudio = (props) => {    
  const {patientId} = useParams();

  const navigate = useNavigate();
  const  { ConsultationType , setConsultationType , SelectedConsultation , setSelectedConsultation} = useContext(GlobalStateContext);  

  const handleChange = (e,URL) => { 
    setSelectedConsultation(e.target.value);  
    navigate(`/Consultation${URL.URL}/${patientId}`);
  } 
  // useEffect(() => {
  //   const updatedConsultationType = [...ConsultationType]; 
  
  //   for (let i = 0; i < updatedConsultationType.length; i++) {
  //     if (updatedConsultationType[i].URL === "/UploadAudio") {
  //       updatedConsultationType.splice(i, 1); 
  //       i--; 
  //     }
  //   }
  
  //   setPageNames(updatedConsultationType); 
  // }, []);
  
  return (
    <div>
      <Navbar name={props.name} />
          
      <div className='flex'>
      <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
        <div className='m-0  md:ml-64  h-full w-full flex-col items-center dark:bg-slate-900'> 
        <div className='flex justify-center items-center mt-5'>
      <select className='dark:bg-slate-800 p-2 rounded-sm text-gray-300' id="dropdown"  value={SelectedConsultation}
  onChange={(e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedItem = ConsultationType[selectedIndex];
    handleChange(e,selectedItem);
  }}>
        {ConsultationType.map((item, index) => (
  <option key={index+1}  value={item.PageName}>
    {item.PageName}
  </option>
))}
      </select>
    </div>
          {/* The 'ml-64' class adds margin to the right to avoid content overlapping with the fixed sidebar */}
          <UploadAudioCompo/>
        </div>
      </div>
    </div>
  );
};

export default UploadAudio;
