import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar/sidebar.js';

const Dashboard = (props) => {

  return (
    <div >
<Navbar name={props.name} />
    <div className='flex'>
    <div className='fixed h-full top-0 left-0 '>
      {/* Add your styling for the fixed sidebar here */}
      <Sidebar />
    </div>
    <div className=' p-8 pt-16 ml-64 m-16 h-full w-full flex-col items-center'>
  
  This page will be ready soon!
       
       </div>
       </div>  
       </div>    
  
 
  );
};

export default Dashboard;
