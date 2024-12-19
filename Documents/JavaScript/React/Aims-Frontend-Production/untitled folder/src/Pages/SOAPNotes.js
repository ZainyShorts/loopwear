import React from 'react'
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar/sidebar'; // Make sure the filename matches
import SoapNote from '../Components/SoapNote';
const SOAPNotes = (props) => {
    return (
    <div>
      <Navbar name={props.name} />

      <div className='flex'>
      <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
        <div className=' px-3 pt-10 dark:bg-slate-900 m-0 md:ml-64 h-full w-full flex-col items-center'>
          {/* The 'ml-64' class adds margin to the right to avoid content overlapping with the fixed sidebar */}
          <SoapNote />
        </div>
      </div>
    </div>
 
  )
}

export default SOAPNotes