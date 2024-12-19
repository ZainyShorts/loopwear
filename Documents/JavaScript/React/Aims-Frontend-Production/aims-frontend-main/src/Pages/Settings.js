import React from 'react';
import Navbar from '../Components/Navbar';
import Profile from '../Components/Profile.js';
import Sidebar from '../Components/sidebar.js';
import SettingsPage from '../Components/Settings/Settings.js'
const Settings = (props) => {

  return (
    <div>
<Navbar name={props.name} />
    <div className='flex'>
    <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
    <div className=' m-0 ml-0 md:ml-64 h-full w-full flex-col items-center dark:bg-slate-900'>
  
    <SettingsPage name = {props.name}></SettingsPage>
       
       </div>
       </div>  
       </div>    
  
 
  );
};

export default Settings;
