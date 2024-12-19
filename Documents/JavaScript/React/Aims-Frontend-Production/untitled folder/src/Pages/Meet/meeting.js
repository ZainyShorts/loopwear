import React from 'react'
import Navbar from '../../Components/Navbar.js';
import Sidebar from '../../Components/Sidebar/sidebar.js';
import Meet from '../../Components/Meeting/Record/Meet.js';
const Meeting = () => {
  return (
    <>
    <div>
    <Navbar  />
        <div className='flex'>
        <div className='fixed h-full top-0 left-0 '>
          <Sidebar />
        </div>
         <Meet/>
           </div>  
           </div>    
    </>
  )
}

export default Meeting