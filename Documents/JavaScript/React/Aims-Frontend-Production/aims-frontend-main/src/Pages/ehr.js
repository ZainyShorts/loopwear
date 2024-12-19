import React from 'react'
import EHRAddPatient from '../Components/EHR/EHR'
import Sidebar from '../Components/sidebar.js';
import Navbar from '../Components/Navbar';

const EHR = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex h-[100vh] items-center justify-center dark:bg-slate-900 ' >
      <div className='fixed h-full top-0 left-0 hidden md:block'>
      <Sidebar />
    </div>
        <div className='p-8 pt-16  ml-0 m-0 md:ml-64  h-full w-full flex-col items-center'>
          <EHRAddPatient/>
        </div>
      </div>    
    </div>
  )
}

export default EHR