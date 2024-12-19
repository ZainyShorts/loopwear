import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Modal = ({ open, onClose, children }) => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state)=>state.auth)

    const OldPatient= ()=>{
    navigate('/Patient')

       }
   const NewPatient= ()=>{
        navigate(`/registerPatient/${userInfo._id}`)

   }
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors p-20 ${open ? "visible bg-black/20 p-20 items-center " : "invisible"}`} >
      <div className={`bg-white rounded-lg shadow p-6 transition-all max-W-md ${open ? "scale-100 opacity-100 bg-red-50" : " scale-110 opacitiy-0"}`} onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" onClick={onClose}>
          x
        </button>
        {children}  
        <div className="pt-4 text-center">
        <button data-modal-hide="popup-modal" onClick={NewPatient} type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    New Patient
                </button>
                <button data-modal-hide="popup-modal" onClick={OldPatient} type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Follow Up</button>
          
            </div>
      </div>
    
    </div>
  );
};

export default Modal;

