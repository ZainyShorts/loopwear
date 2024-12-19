import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Node_API_URL } from '../../client';



const AppointmentConfirmation = () => {
  const { appId } = useParams()
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [permission,setPermission] = useState(false)
  
  useEffect(()=>{
    permissionCheck()
  },[appId])

  const permissionCheck = async () => {    
    try {
        // Make the API call
      const response = await axios.get(`${Node_API_URL}/api/get/userResponseFromEmail?appId=${appId}`);
      if (response.data === true) {
        setPermission(true)
      } else {
        setPermission(false)
      }
    } catch (error) {
        setPermission(false)
    } finally {
      setLoading(false);
    }
  };


  // Function to handle the API call for both confirm and cancel
  const handleResponse = async (action) => {
    setLoading(true); // Show loading while API call is made
    const status = action === 'confirm' ? 'Scheduled' : 'Cancelled';

    
    try {
        // Make the API call
        console.log( appId,
            status,)
      const response = await axios.post(`${Node_API_URL}/api/post/userResponseFromEmail`, {
        appId,
        status,
      });
      if (response.data === true) {
        setStatusMessage(`Appointment has been ${action === 'confirm' ? 'confirmed' : 'cancelled'}.`);
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatusMessage('Error in response. Please try again.');
    } finally {
      setLoading(false);
    }
  };
if(permission)
{
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className="card bg-white rounded-2xl w-80 h-auto p-6 flex flex-col items-center justify-center text-center gap-3 shadow-md">
        <br/>
          <span className="card__title text-xl font-black text-gray-800">Confirm Your Appointment</span>
          <p className="card__content text-sm text-gray-800 leading-5">
            Please confirm or cancel your appointment.
          </p>
          {loading ? (
            <>
            <p className="text-blue-600 font-semibold">Processing...</p>
            <br/>
  
            </>
            
          ) : statusMessage ? (
            <>
            <p className="text-green-600 font-semibold">{statusMessage}</p>
            <br/>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2.5 w-full ">
              <button 
                onClick={() => handleResponse('confirm')} 
                className="bg-green-500 text-white font-bold p-2.5 w-[50%] rounded-lg hover:opacity-80"
              >
                Confirm
              </button>
              <button 
                onClick={() => handleResponse('cancel')} 
                className="bg-red-500 text-white font-bold p-2.5 w-[50%] rounded-lg hover:opacity-80"
              >
                Cancel
              </button>
            <br/>
  
            </div>
          )}
        </div>
      </div>
    );
}else{
    return (
        <div className='h-screen flex justify-center items-center'>
  <div className="card bg-white rounded-2xl w-80 h-auto p-6 flex flex-col items-center justify-center text-center gap-3 shadow-md">
    <span className="card__title text-xl font-black text-gray-800">Appointment</span>
    <p className='text-5xl'>
      ✅
    </p>
    <p className="text-green-600 font-semibold">Your appointment status has been successfully updated!</p>
  </div>
</div>

      );
}
};

export default AppointmentConfirmation;
