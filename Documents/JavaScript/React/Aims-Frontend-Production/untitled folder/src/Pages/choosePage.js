import React from 'react';
import Choose from '../Components/choose.js';
import Navbar from '../Components/Navbar';
import Profile from '../Components/Profile.js';
import Sidebar from '../Components/Sidebar/sidebar.js';

const ChoosePage = (props) => {

  return (
    <div>
<Navbar name={props.name} />
    <div className='flex'>
    <div className='fixed h-full top-0 left-0 '>
      {/* Add your styling for the fixed sidebar here */}
      <Sidebar />
    </div>
    <div className=' p-8 pt-16 ml-64  h-full w-full flex-col items-center'>
  
       
    <Profile name={props.name} />
       </div>
       </div>  
       </div>    
  
 
  );
};

export default ChoosePage;


