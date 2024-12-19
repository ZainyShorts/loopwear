/*eslint-disable*/
import React, { useState  , useContext }from 'react';
import { Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { UserCircleIcon, ChevronDownIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from 'react-redux';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { logout, reset } from '../features/auth/authSlice';  
 

import { GlobalStateContext } from '../Context/GlobalStateContext';
const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const { userInfo } = useSelector((state) => state.auth); 
  const {darkMode,setDarkMode,navigate,setToken} = useContext(GlobalStateContext);
  const closeMenu = () => setIsMenuOpen(false);

  const signout = () => {

    dispatch(logout());
    dispatch(reset());
    setToken("")
    navigate('/')
  }   
  
  function sleep(number)
{
    return new Promise((resolve,reject)=>{
      setTimeout(resolve,number);
    })
  
} 
  const handleTransition=async(path)=>{
    const body = document
    .querySelector('body')
    body.classList.add('page-transition')
    await sleep(200)
    navigate(path)
    await sleep(200)
    body.classList.remove('page-transition')
  }
  
  const profileMenuItems = [
    { label: "My Profile", icon: UserCircleIcon },
    { label: "Edit Profile", icon: Cog6ToothIcon, action: () => window.location.href = '/Settings' },
    { label: "Sign Out", icon: PowerIcon, action: signout },
  ];

  return (
    // <div className='shadow-md w-full top-0 left-0  bg-white'>
    <div className='relative flex items-center justify-between py-4 bg-blue-gray-300 dark:bg-slate-800'>
    {/* Button with h1 Class on the Left */}
    <div className='flex justify-between items-center'>  
    <h1 className="font-sans ml-5  text-black dark:text-white">
          Dr. {userInfo.first_name} {userInfo.last_name}
        </h1>  
        
      {open? <ul 
          class=" z-10  bg-blue-gray-300 dark:bg-slate-800 mt-14  absolute left-0 top-0 w-full p-10 rounded-b-3xl space-y-10 text-white text-center"
        >
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/')}>
              HOME
            </span>
          </li>
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/Patient')}>
              PATIENTS
            </span>
          </li>
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/TodayPatients')}>
              TODAY PATIENTS
            </span>
          </li>
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition(`/registerPatient/${userInfo._id}`)}>
              VOICE INTAKE
            </span>
          </li>  
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition(`/AimsAssistant`)}>
              Aims Assistant
            </span>
          </li> 
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/Share')}>
              SHARE
            </span>
          </li>   
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/Consultation/Quick')}>
              Quick Consultation
            </span>
          </li>  
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/AppointmentMenu')}>
            Appointment
            </span>
          </li> 
          {/* <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/Calendar')}>
            Calendar
            </span>
          </li>  */}
          {/* <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/EHR')}>
              EHR
            </span>
          </li>  */}
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/Help')}>
            GUIDE
            </span>
          </li>  
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/Invoice')}>
              Invoice
            </span>
          </li> 
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/Settings')}>
             SETTINGS
            </span>
          </li> 
        </ul> :  null }

    </div>
  
    {/* Menu on the Right */}
    <div className='flex items-center space-x-4 mr-5' > 
      {/* Toggle Button for Mobile Menu */} 
      {/* <img
            onClick={handleMoonClick}
            id="moon"
            src={moon}
            class=" block md:hidden  w-5 cursor-pointer h-5 ml-5"
            alt=""
            /> */}
      <div onClick={() => setOpen(!open)} className='cursor-pointer md:hidden w-7 h-7 dark:text-white'> 
        {open ? <XMarkIcon/> : <Bars3BottomRightIcon />}
      </div>
  
      {/* Web Menu */} 
      <div className=' hidden md:flex items-center'>  
      <h1 className="font-sans text-black  dark: text-white mr-auto">
                  Dr. {userInfo.first_name} {userInfo.last_name}
                </h1> 
                {/* <img
            onClick={handleMoonClick}
            id="moon"
            src={moon}
            class="hidden md:block w-5 cursor-pointer h-5 ml-5"
            alt=""
            /> */}
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <div className="flex items-start">
            <MenuHandler className="flex items-center">
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center justify-between rounded-full py-0.5 pr-5"
              >
             
                <ChevronDownIcon
                  className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </MenuHandler>
  
            <div className="flex-grow">
              <MenuList className="p-1 bg-[#bdcfea]">
                {profileMenuItems.map(({ label, icon, action }, key) => (
                  <MenuItem
                    key={label}
                    onClick={() => { closeMenu(); if (action) action(); }}
                    className={`flex items-center gap-2 rounded ${key === profileMenuItems.length - 1 ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`}
                  >
                    {React.createElement(icon, { className: `h-4 w-4 ${key === profileMenuItems.length - 1 ? "text-red-500" : ""}` })}
                    <span className={`font-normal ${key === profileMenuItems.length - 1 ? "text-red-500" : ""}`}>{label}</span>
                  </MenuItem> 
                ))}
              </MenuList>
            </div>
          </div>
        </Menu>
      </div>
    </div>
  </div>
  
    // </div>
  );
};

export default Header;
