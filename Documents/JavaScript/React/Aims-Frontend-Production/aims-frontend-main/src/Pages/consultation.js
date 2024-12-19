/*eslint-disable*/
import React from 'react';
import Navbar from '../Components/Navbar.js';
import Sidebar from '../Components/sidebar.js';
import ConsultationOptions from '../Components/ConsultationOptions/ConsultationOptions.js'

const Consultation = (props) => {

  return (
    <div >
<Navbar name={props.name} />
    <div className='flex justify-center text-center'>
    <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
    <div className=' md:ml-64  h-[100vh] w-full flex-col items-center' >
  
      <ConsultationOptions/>
       
       </div>
       </div>  
       </div>    
  
 
  );
};

export default Consultation;
