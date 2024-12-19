/*eslint-disable*/
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import SignOutModal from './SignOutModal'; // Assuming SignOutModal is implemented separately
import { MdOutlineSettings } from 'react-icons/md';
import { IoMdHelpCircleOutline, IoIosList } from 'react-icons/io';
import { MdHome} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import { SlCalender } from "react-icons/sl";
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { FaStopwatch } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { FaPerson ,FaMicrophoneLines , FaFileInvoiceDollar , FaRobot} from "react-icons/fa6";

function Sidebar() {
  const navigate = useNavigate();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const { totalPatientCount,todayPatientCount,role } = useContext(GlobalStateContext)
  const { userInfo } = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  const docUrl = [
    { to: '/', label: 'Home', icon: <MdHome size={24} />, key: 'home' },
    { to: '/Patient', label: `Patients ${totalPatientCount}`, icon: <IoIosList size={24} />, key: 'Patients' }, 
    { to: '/TodayPatients', label: `Today's Patient ${todayPatientCount}`, icon: <FaPerson size={24} />, key: 'TodayPatients' },
    { to: '/AppointmentSelection', label: 'Appointment', icon: <SlCalender size={24}  /> , key: 'Appointment'  },
    { to: `/registerPatient/${userInfo._id}`, label: 'Voice Intake ', icon: <FaMicrophoneLines size={24} />, key: 'Register' }, 
    { to: `/AimsAssistant`, label: 'AIMS Assist (Q&A) ', icon: <FaRobot size={24} />, key: 'Assistant' }, 
    { to: '/Consultation/Quick', label: 'Quick Consultation ', icon: <FaStopwatch size={24} />, key: 'QuickConsultation' }, 
    { to: '/OpenAiReport', label: 'OpenAiReport ', icon: <TbReportMedical size={24} />, key: 'OpenAiReport' },         
    { to: '/Invoice', label: 'Invoice ', icon: <FaFileInvoiceDollar size={24} />, key: 'Invoice' }, 
    { to: '/Help', label: 'Guide', icon: <IoMdHelpCircleOutline size={24} />, key: 'Help' },
    { to: '/Settings', label: 'Settings', icon: <MdOutlineSettings size={24} />, key: 'Settings' }, 
  ] 

  const assistantUrl = [
    { to: '/', label: 'Home', icon: <MdHome size={24} />, key: 'home' },
    { to: '/Patient', label: `Patients ${totalPatientCount}`, icon: <IoIosList size={24} />, key: 'Patients' }, 
    { to: '/TodayPatients', label: `Today's Patient ${todayPatientCount}`, icon: <FaPerson size={24} />, key: 'TodayPatients' },
    { to: '/AppointmentSelection', label: 'Appointment', icon: <SlCalender size={24}  /> , key: 'Appointment'  },
    { to: `/registerPatient/${userInfo._id}`, label: 'Voice Intake ', icon: <FaMicrophoneLines size={24} />, key: 'Register' }, 
    { to: `/AimsAssistant`, label: 'AIMS Assist (Q&A) ', icon: <FaRobot size={24} />, key: 'Assistant' }, 
    { to: '/Invoice', label: 'Invoice ', icon: <FaFileInvoiceDollar size={24} />, key: 'Invoice' }, 
    // { to: '/AllReports', label: 'Reports ', icon: <TbFileReport size={24} />, key: 'Reports' },         
    { to: '/Help', label: 'Guide', icon: <IoMdHelpCircleOutline size={24} />, key: 'Help' },
    { to: '/Settings', label: 'Settings', icon: <MdOutlineSettings size={24} />, key: 'Settings' }, 
  ]

  const handleTransition=async(path)=>{
    const body = document
    .querySelector('body')
    body.classList.add('page-transition')
    await sleep(200)
    navigate(path)
    await sleep(200)
    body.classList.remove('page-transition')
  }
  function sleep(number)
{
    return new Promise((resolve,reject)=>{
      setTimeout(resolve,number);
    })
  
}
 

  return (
    <div className="flex flex-col h-full  bg-[#FDFEE2] dark:bg-slate-900 shadow-lg w-64">
      <div className="flex-1 px-4 py-6 overflow-y-auto">
      <Link to="/"><img src={'/logo.png'} alt="Aims-logo" className="w-24 h-24 ml-12 font-medium" /></Link>
      {role == 'Doctor'?  <ul className="space-y-4 mt-12">
      { docUrl.map((item) => (
            <li key={item.key}>
              <button
               onClick={()=>{
                  
                handleTransition(item.to);
               }}
                to={item.to}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.to  ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-gray-300 dark:text-white dark:hover:bg-blue-100 dark:hover:text-blue-500' 
                }`}
                
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-medium text-yellow-800 bg-yellow-200 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
        :
        <ul className="space-y-4 mt-12">
      { assistantUrl.map((item) => (
            <li key={item.key}>
              <button
               onClick={()=>{
                  
                handleTransition(item.to);
               }}
                to={item.to}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.to  ? 'bg-blue-100 text-blue-500' : 'text-gray-700 hover:bg-gray-300 dark:text-white dark:hover:bg-blue-100 dark:hover:text-blue-500' 
                }`}
                
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-medium text-yellow-800 bg-yellow-200 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>}
      </div>
      {showSignOutModal && (
        <SignOutModal
          isOpen={showSignOutModal}
          onConfirm={handleSignOut}
          onCancel={() => setShowSignOutModal(false)}
        />
      )}
    </div>
  );
}

export default Sidebar;
