import React, { useContext, useState } from 'react';
import Navbar from '../../Components/Navbar.js';
import Sidebar from '../../Components/Sidebar/sidebar.js';
import { FaEnvelope } from 'react-icons/fa';
import { FaFileDownload } from "react-icons/fa";
import QRCode from "react-qr-code";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GlobalStateContext } from '../../Context/GlobalStateContext.js';
import { Node_API_URL } from '../../client.js';
import { useParams } from 'react-router-dom';

const Share = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { token } = useContext(GlobalStateContext);
    const { qrId } = useParams()
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleEmailSend = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                
            };

            const data = {
              businessMail:userInfo.businessMail,
              appCode:userInfo.appCode,
              userEmail:email, // Include the email in the request body
              id:qrId
            }

            const res = await axios.post(`${Node_API_URL}/api/post/sendQrCode`,data, config);
            console.log(res)
            if(res.data.response)
            {
              alert(res.data.msg); // Show success or error message
              setEmail(""); // Clear the email field after sending
              setIsModalOpen(false); // Close the modal after sending
            }else{
              alert(res.data.msg)
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className='fixed h-full top-0 left-0 hidden md:block'>
                    <Sidebar />
                </div>
                <div className='p-4 m-0 md:ml-64 dark:bg-slate-900 h-[96vh] w-full items-center'>
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <QRCode
                            className='w-[260px] h-[325px] sm:w-[300px] sm:h-[355px] md:w-[440px] md:h-[540px] lg:w-[500px] lg:h-[600px]'
                            enableBackground={true}
                            bgColor='#ffffff'
                            fgColor='#111111'
                            size={256}
                            value={`https://www.aiscribers.com/updatePatient/${qrId}`}
                            viewBox={`0 0 256 256`}
                        />
                        <div className='flex'>
                            <button
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = './qr-code.png';
                                    link.download = 'qr-code.png';
                                    link.click();
                                }}
                                className="relative top-[-10px] md:top-0 flex items-center w-36 sm:w-40 mt-14 mr-2 justify-center p-4 bg-[#6A8BEF] text-white rounded-lg hover:bg-blue-300 transition-colors"
                            >
                                <FaFileDownload className="mr-2" />
                                Download 
                            </button>
                           
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            {isModalOpen && (
      <div className="fixed inset-0 z-10 bg-slate-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-transparent backdrop-blur-md w-96 p-6 dark:bg-slate-900 rounded-lg shadow-lg">
          <h2 className="text-xl dark:text-white text-center font-bold mb-4">Send QR-Code </h2>
    
          
    
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded dark:bg-slate-900 dark:text-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter patient's email" 
              required
            /> 
          </div>
    
         
    
          {/* Centered Buttons */}
          <div className="flex w-full justify-center items-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleEmailSend}
            >
              Send
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
  
)}


        </div>
    );
}

export default Share;
