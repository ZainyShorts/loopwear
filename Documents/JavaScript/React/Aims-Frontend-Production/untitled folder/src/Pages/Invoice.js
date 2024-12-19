import React from 'react'
import InVoice from '../Components/Invoices/InVoice'  
import Sidebar from '../Components/Sidebar/sidebar.js';
import Navbar from '../Components/Navbar.js';

const Invoice = (props) => {
  return (
    <>

<Navbar name={props.name} />
    <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
    <div className=' md:ml-64 ' >
  
      <InVoice/>
       
       </div>
  
    </>
  )
}

export default Invoice
