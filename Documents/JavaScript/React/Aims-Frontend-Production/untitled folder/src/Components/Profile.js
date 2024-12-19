import React, { useContext, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { TbReportAnalytics } from 'react-icons/tb';
import { MdSettings } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './modal2.js';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import prof from '../images/prof.png';
import { GlobalStateContext } from '../Context/GlobalStateContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice.js';
const Profile = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { checker,setUser,getPaitentsCount } = useContext(GlobalStateContext)
  const { userInfo } = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const redirect = () => {
    setOpen(true);
  };

  useEffect(()=>{
    checker().then((res)=>{
      if(res==false)
      {
        setUser(false)
        dispatch(logout())
        navigate('/')
      }else{
        // getPaitentsCount()
      }
    })
    
  },[])


  const profilePictureUrl = props.name.profile_picture || prof;
  return (
    <div className="p-8 mx-auto bg-[#F0F7FF] rounded-lg">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div className="col-span-4 sm:col-span-3">
          <div className="bg-[#FFFDF2] rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center">
              <img src={profilePictureUrl} alt="Profile" className="w-32 h-32 rounded-full mb-4 shadow-md" />
              <h1 className="text-3xl font-bold text-gray-800">Dr. {props.name.first_name} {props.name.last_name}</h1>
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-700">Personal Info</span>
              <ul className="mt-4">
                <li className="mb-2 font-bold flex items-center">
                  <FaUser className="mr-2 text-gray-500" /> {/* Icon for name */}
                  <span className="max-w-xs overflow-hidden whitespace-pre-wrap break-all bg-[#A6D4FF] font-bold text-gray-800 px-3 py-1 rounded-lg truncate">{props.name.first_name} {props.name.last_name}</span>
                </li>
                <li className="mb-2 font-bold flex items-center">
                  <FaEnvelope className="mr-2 text-gray-500" /> {/* Icon for email */}
                  <span className="max-w-xs overflow-hidden whitespace-pre-wrap break-all bg-[#A6D4FF] font-bold text-gray-800 px-3 py-1 rounded-lg truncate">{props.name.email}</span>
                </li>
                <li className="mb-2 font-bold flex items-center">
                  <FaPhone className="mr-2 text-gray-500" /> {/* Icon for phone number */}
                  <span className="max-w-xs overflow-hidden whitespace-pre-wrap break-all bg-[#A6D4FF] font-bold text-gray-800 px-3 py-1 rounded-lg truncate">{props.name.phone_number}</span>
                </li>
                <li className="mb-2 font-bold flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" /> {/* Icon for address */}
                  <span className="max-w-xs overflow-hidden whitespace-pre-wrap break-all bg-[#A6D4FF] font-bold text-gray-800 px-3 py-1 rounded-lg truncate">{props.name.Address}</span>
                </li>
              </ul>
            </div>
          </div>

          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col gap-4">
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" viewBox="0 0 20 20" fill="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-semibold text-gray-700">Please indicate whether the patient is a new patient or a returning one.</h3>
              </div>
            </div>
          </Modal>
        </div>

        <div className="col-span-4 sm:col-span-9">
          <div className="bg-[#FFFDF2] rounded-lg shadow-lg p-8">
            <form>
              <div className="grid gap-4">
                <div className="flex items-center">
                  <label htmlFor="first_name" className="text-lg font-semibold text-gray-800">Title:</label>
                  <span className="ml-2 bg-[#A6D4FF] ms-3 whitespace-break font-bold text-gray-800 px-3 py-1 rounded-lg">{props.name.title}</span>
                </div>
                <div className="flex items-center">
                  <label htmlFor="last_name" className="text-lg font-semibold text-gray-800">Speciality:</label>
                  <span className="ml-2 bg-gray-100  ms-3 whitespace-breakfont-bold text-gray-800 px-3 py-1 rounded-lg">{props.name.speciality}</span>
                </div>
                <div className="flex items-center">
                  <label htmlFor="company" className="text-lg font-semibold text-gray-800">Location:</label>
                  <span className="ml-2 bg-[#A6D4FF] ms-3 whitespace-break font-bold text-gray-800 px-3 py-1 rounded-lg">{props.name.base}</span>
                </div>
                {/* <div className="flex items-center">
                  <label htmlFor="phone" className="text-lg font-semibold text-gray-800">Responsible To:</label>
                  <span className="ml-2 bg-gray-100  ms-3 whitespace-break font-bold text-gray-800 px-3 py-1 rounded-lg">{props.name.responsible}</span>
                </div> */}
              </div>
            </form>
          </div>

          {/* <div className="flex flex-row mt-8 space-x-4">
            <button onClick={redirect} className="bg-blue-500 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center">
              <IoMdAdd size={24} className="mr-2" />New consultation
            </button>
            <Link to="/patient" className="inline-block">
              <button className="bg-green-500 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center">
                <TbReportAnalytics size={24} className="mr-2" />Show Previous Reports
              </button>
            </Link>
            <button className="bg-red-500 text-white text-sm font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center" onClick={() => navigate("/Settings")}>
              <MdSettings size={24} className="mr-2" />
              Setting
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;