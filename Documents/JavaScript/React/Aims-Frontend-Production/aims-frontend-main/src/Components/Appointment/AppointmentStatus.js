import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import { ReactComponent as NoPatientSvg } from "../../images/NoPatientsYet.svg"; 
import { Node_API_URL } from '../../client'; 
import { useSelector } from 'react-redux';
import axios from 'axios';  
import { useContext } from 'react'; 
import { GlobalStateContext } from '../../Context/GlobalStateContext'; 
import Loader from '../ui/Loader/Loader' 
import { useNavigate } from 'react-router-dom'; 
import Button from '../ui/Button/Button';


const TABLE_HEAD = ["#","Name", "Email",  "Date", "Status" , "Update"]; 

const AppointmentStatus = ({getCalenderDates}) => { 
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);     
 
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [form,setFormData] = useState({
    name:"",
    email:"",
    time:getTodayDate(),
    status:""
    }); 
  const { userInfo } = useSelector((state)=>state.auth);
  const [loading, setLoading] = useState(false);
  const {token} = useContext(GlobalStateContext); 
  const onChangeForm = (e) => { 
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Use token if needed
          },
        };
        const todayDate = getTodayDate();  
        const payload = { time: todayDate , status:"All"}; 
  
        const response = await axios.post(
          `${Node_API_URL}/api/post/filterAppointments`,
          payload,
          config
        );
       
        if (response.data.response) {
          setPatients(response.data.appointments);  
        } else {
          console.log('Failed to fetch today\'s appointments');
        }
      } catch (error) {
        console.error('Error fetching today\'s appointments:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTodayAppointments(); // Call the function when the component loads
  }, []); // Empty dependency array ensures it runs on mount
  

 // Ensure the function is declared as async
const handleStatusChange = async (id,newStatus) => {
  setLoading(true); // Optionally show loading during API call
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token if necessary
      },
    };
    let data;
    if(newStatus=="Complete" || newStatus=="Cancelled")
    {
      data={
        businessMail:userInfo.businessMail,
        appCode:userInfo.appCode,
        appId:id,
        pic:userInfo.profile_picture,
        status: newStatus,
        website:userInfo.website,
        clinicName:userInfo.clinicName,
        address:userInfo.Address,
        number:userInfo.phone_number,
      }

    }
    else{
      data = { appId:id , status: newStatus }
    }

    // Use await here, but the function must be async
    const response = await axios.post(
      `${Node_API_URL}/api/post/changeStatus`,
      data,
      config
    );

    if (response.data.response) {

      console.log('Status updated successfully!');  
      setPatients((prevPatients) => prevPatients.filter((patients) => patients._id !== id));
      if(newStatus=="Scheduled")
      {
        getCalenderDates()
      }
    } else {
      console.log('Failed to update status');
    }
  } catch (error) {
    console.error('Error updating status:', error);
  } finally {
    setLoading(false);
  }
};
 
const fetchAppByFilter = async (e) => { 
  e.preventDefault();
  setLoading(true); // Show loading spinner
  
  try { 
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include token if necessary
      },
    };


    // Dynamically build the payload with only non-empty fields
    const payload = {
    
        name:form.name,email:form.email,time:form.time,status:form.status
        
    };

    // Make POST request with the dynamically built payload
    const response = await axios.post(
      `${Node_API_URL}/api/post/filterAppointments`,
      payload , config
    ); 
        // Handle the response
    if (response.data.response) {
      console.log("Success");
      setPatients(response.data.appointments); 
    } else {
      console.log('Failed to fetch appointments');
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
  } finally {
    setLoading(false); // Hide loading spinner
  }
};

const PrintPatientID = (PatientID) => {  
  navigate(`/PatientFich/${PatientID}`);
}
  return (
    <>
      <div className=" w-[95vw] md:w-[calc(100vw-285px)] rounded-md dark:bg-slate-800 p-2  mx-auto   mt-2 ">
        {/* Form for filtering (if needed) */}
        <form className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-white mb-2">Name</label>
            <input
              type="text"
              name="name"  
              value={form.name} 
              onChange={onChangeForm} 
              className="p-2 border border-gray-800 rounded-md dark:border-slate-600 dark:text-gray-800"
              placeholder="Enter name"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mb-2">Email</label>
            <input
              type="email"
              name="email"  
              value={form.email}
              onChange={onChangeForm} 
              className="p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-gray-800"
              placeholder="Enter email"
            />
          </div>

          {/* Date Input */}
          <div className="flex flex-col">
            <label htmlFor="date" className="text-white mb-2">Date</label>
            <input
              type="date"
              name="time" 
              value={form.time}
              onChange={onChangeForm}
              className="p-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-gray-800"
            />
          </div>

          {/* Status Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-white mb-2">Status</label>
            <select
              name="status" 
              value={form.status}
              onChange={onChangeForm}
              className="p-2 border mt-1 border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-gray-900"
            >  
              <option selected  value="All">All</option>
              <option  value="Scheduled">Scheduled</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Complete">Complete</option> 
              <option value="Pending">Pending</option>
              
            </select>
          </div>  
          <div className='w-[100%]  mt-8 flex justify-center text-center'>
          <Button text='Search' onclick={fetchAppByFilter}/>
         </div>

        </form> 
       
        
          
         <style jsx>{`
  /* From Uiverse.io by cssbuttons-io */
  .button {
    height:40px;
    align-items: center;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #ffffff;
    display: flex;
    font-size: 18px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 3px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s;
  }

  .button:active,
  .button:hover {
    outline: 0;
  }

  .button span {
    background-color: rgb(5, 6, 45);
    border-radius: 6px;
    width: 100%;
    height: 100%;
    transition: 300ms;
  }

  .button:hover span {
    background: none;
  }

  .button:active {
    transform: scale(0.9);
  }
`}</style>

      </div>

      <Card className="h-[425px] fade-in-animation w-[95vw] md:w-[calc(100vw-285px)]  mt-5 mx-auto border-2 bg-[#FDFEE2] dark:bg-slate-800 border-blue-600 rounded-lg shadow-2xl p-6 dark:text-white">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          <>
            {patients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-left">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="p-2">
                          <Typography variant="small" className="font-semibold uppercase">
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => {
                      const isLast = index === patients.length - 1;
                      const classes = isLast ? "p-2" : "p-2 border-b border-blue-100";

                      return (
                        <tr 
                         
                          key={patient._id}
                          className="hover:bg-blue-50 transition-colors cursor-pointer dark:hover:text-blue-500"
                        >
                          <td onClick={()=>{PrintPatientID(patient.patientID)}} className={classes}>{index+1}</td>
                          <td onClick={()=>{PrintPatientID(patient.patientID)}} className={classes}>{patient.name}</td>
                          <td onClick={()=>{PrintPatientID(patient.patientID)}} className={classes}>{patient.email}</td>
                          <td onClick={()=>{PrintPatientID(patient.patientID)}} className={classes}>{formatDate(patient.time)}</td>  
                          <td onClick={()=>{PrintPatientID(patient.patientID)}} className={classes}>{patient.status}</td>
                          <td className={classes}>
                            <select
                              id={`status-${patient._id}`}
                              value={patient.status}
                              onChange={(e) => handleStatusChange(patient._id, e.target.value)}
                              className="p-1 border border-gray-300 rounded-md dark:bg-slate-800 dark:border-slate-600 dark:text-gray-200"
                            >
                              <option value="Scheduled">Scheduled</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Complete">Complete</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody> 
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <Typography variant="h5" className="font-bold dark:text-white text-2xl text-center">
                  No Appointments Yet
                </Typography>
                <Typography variant="body2" className="text-center dark:text-white mt-2">
                  Start by adding new Appointments to see them listed here.
                </Typography>
              </div>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default AppointmentStatus;
