import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar/sidebar.js';
import HelpComponent from '../Components/Help.js';
const Help = (props) => {

  return (
    <div >
<Navbar name={props.name} />
    <div className='flex justify-center text-center'>
    <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
    <div className=' md:ml-64  h-[100vh] w-full flex-col items-center' >
  
      <HelpComponent></HelpComponent>
       
       </div>
       </div>  
       </div>    
  
 
  );
};

export default Help;
