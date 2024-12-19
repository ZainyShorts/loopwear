/*eslint*/
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuClipboardEdit } from "react-icons/lu";
import Calendar from "react-calendar";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { GlobalStateContext } from "../../Context/GlobalStateContext";
import { Node_API_URL } from "../../client";
import moment from 'moment';
import { useSelector } from "react-redux";
import Loader from '../ui/Loader/Loader' 
import NewModal from '../ui/NewModal/NewModal';
Modal.setAppElement("#root"); 


const AppointmentSetup = ({setCalendarState }) => {
  const { userInfo } = useSelector((state)=>state.auth); 
  const [isModalOpen , setISModalOpen] = useState(false);


  const { token , navigate , showToast ,setModalMessage ,setIsOpen,userTimezone , setAppointmentRender} = useContext(GlobalStateContext) 

  const [emailError, setEmailError] = useState(''); 
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [selectedPatient, setSelectedPatient] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const[ShowPatientType,setShowPatientType]=useState("today")
  const [searchMode,setSearchMode] = useState(false)


  const [loading,setLoading]=useState(false)

  const [showModal, setShowModal] = useState(false);
  const [currentEditAppointment, setCurrentEditAppointment] = useState(null);

  const [TodayPatient,setTodayPatient]=useState([]);  
  const [AllPatients,setAllPatients]=useState([]); 




  useEffect(() => {
    const fetchData = async () => {
      // setAppointmentRender(true);  
  
      await todayPatients();       
      await fetcAllPatients();     
      await getbyDateAppointment(getCurrentDate());
  
      // setAppointmentRender(false); 
    };
  
    fetchData();
  }, []);
  

const handleSchedule = () => {
    if (selectedPatient && appointmentDate) {
      // Check for collision in hours and minutes
      const isCollision = scheduledAppointments.some((appointment) => {
        const existingDate = new Date(appointment.appointmentDate);
        const newDate = new Date(appointmentDate);
  
        return (
          existingDate.getFullYear() === newDate.getFullYear() &&
          existingDate.getMonth() === newDate.getMonth() &&
          existingDate.getDate() === newDate.getDate() &&
          existingDate.getHours() === newDate.getHours() &&
          existingDate.getMinutes() === newDate.getMinutes()
        );
      });
  
      if (isCollision) { 

        setModalMsg({head:"Slot Taken " , msg:"This appointment slot is already taken. Please choose another date or time."}); 
        
        return;
      }
  
      // Proceed with scheduling the new appointment
      // const newAppointment = {
      //   id: Date.now(),
      //   patientName: selectedPatient,
      //   appointmentDate,
      // };
  
      // setScheduledAppointments([...scheduledAppointments, newAppointment]);
      // setAppointmentDate(new Date());
      createAppointment()
      // todayPatients()
      setSelectedPatient("");
    } else {
      setModalMsg({head: "Warning!" , msg : "Please select a patient and choose a date and time."}); 
      setISModalOpen(true)
    }
  };
    
const[openModalApptId,setAppopenmodalid]=useState("")
const handleOpenModal = (time,id) => {
    setCurrentEditAppointment(new Date(time));
    setAppopenmodalid(id)
    setShowModal(true);
  };


  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());

  // Function to handle opening of the calendar modal
 

  // Function to handle closing of the calendar modal
  const handleCloseCalendar = () => {
    setShowFilterModal(false);
  };
 
  const [modalmsg , setModalMsg] = useState({head:'', msg:''});
  function formatDate(dateString) {
    const date = new Date(dateString); // Parse the input date string
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single digit days
  
    return `${year}-${month}-${day}`;
  }

  const handleDateChange = (date) => {
    getbyDateAppointment(formatDate(date))
    setFilterDate(date);
    setShowFilterModal(false); // Close modal after selecting a date
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
}



// Fetch Patients 
const todayPatients = async()=>{
  try{
    const config = {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }
    const res = await axios.get(`${Node_API_URL}/api/get/getTodayPatietnsForAppointment`,config);
    console.log(res)
    if(res.data.success==true)
    {
      setTodayPatient(res.data.patients);
    }

  }
  catch(e)
  {
    console.log('error')
  }
}

const fetcAllPatients = async () => {
    try {
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
      const res = await axios.get(`${Node_API_URL}/api/get/getPatients?id=${localStorage.getItem('doc_id')}`,config);
      console.log(res);
      if(res.data.response === true){
        setAllPatients(res.data.patients); 
      }
    } catch (error) {
      console.log('error')
    }
  };

const createAppointment = async()=>{
  try{
    const data = { 
      patientID:selectedPatient,
      time:appointmentDate,
      number:userInfo.phone_number,
      clinicname:userInfo.clinicName,
      businessMail:userInfo.businessMail,
      appCode:userInfo.appCode,
      website:userInfo.website,
      address:userInfo.Address,
      pic:userInfo.profile_picture,
      smsChecked:smsChecked,
      emailChecked:emailChecked,
      userTimezone
    }
    const config = {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }
    setLoading(true)
    const res = await axios.post(`${Node_API_URL}/api/post/createAppointment`,data,config);
    console.log('res',res)
    if(res.data.success==true)
    {
      setName("")
      setEmail("")
      setNumber("")
      setLastName("") 
      if(ShowPatientType=="today")
      {
        todayPatients()
      }else{
        fetcAllPatients()
      }
      setModalMsg({head:"Successful" , msg:res.data.msg}); 
      setISModalOpen(true);  
      setCalendarState(prev => !prev);
    }else{
      setModalMsg({head :'Function Called' , msg:res.data.msg}); 
      setISModalOpen(true);
    }

  }
  catch(e)
  {
    console.log('error')
  }finally{
    setLoading(false)

  }
}


const getbyDateAppointment = async(date)=>{
  // setLoading(true)
  try{
    const data = {
      date:date,
    }
    const config = {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }
    const res = await axios.post(`${Node_API_URL}/api/get/getbyDateAppointment`,data,config)
    console.log(res)
    if(res.data.success==true)
    {
      setScheduledAppointments(res.data.appointments)
    }
  }catch(e)
  {
    console.log('error')
  }finally{
    // setLoading(false)
  }
}

const delAppointment = async(appId)=>{
  try{
    setLoading(true)
    const data = {
      appId,
      number:userInfo.phone_number
    }
    const config = {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }
    const res = await axios.post(`${Node_API_URL}/api/del/delAppointment`,data,config);
    if(res.data.success==true)
    {
      todayPatients()
      getbyDateAppointment(getCurrentDate())
    }
  }
    catch(e){
      console.log('error')
    }finally{
      setLoading(false)
    }
}

const editAppTime = async(appId)=>{
  try{
    setLoading(true)
    const data = {
      appId,
      time:currentEditAppointment,
      number:userInfo.phone_number
    }
    const config = {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }
    const res = await axios.post(`${Node_API_URL}/api/edit/editAppTime`,data,config);
    console.log(res)
    if(res.data.success==true)
    {
      getbyDateAppointment(getCurrentDate())
      setShowModal(false)
      showToast('Appointment Time updated')
    }
  }
    catch(e){
      console.log('error')
    }finally{
      setLoading(false)
    }
}

  const [addPatientModal,setAddPatientModal]=useState(false)

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [smsChecked, setSmsChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const countryCodes = [
    { code: '+1', label: '🇺🇸' },
    { code: '+44', label: '🇬🇧' },
    { code: '+92', label: '🇵🇰' },
    { code: '+33', label: '🇫🇷' },
    { code: '+49', label: '🇩🇪' },
    { code: '+1', label: '🇨🇦' },
    { code: '+64', label: '🇳🇿' },
    { code: '+27', label: '🇿🇦' },
  ];
  

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleAddPatient = async () =>{ 
    let hasError = false;

    // Reset previous errors
    setNameError('');
    setLastNameError('');
    setEmailError('');
    setNumberError('')

    // Validate First Name
    if (!name.trim()) {
      setNameError('First Name is required');
      hasError = true;
    }

    // Validate Last Name
    if (!lastName.trim()) {
      setLastNameError('Last Name is required');
      hasError = true;
    }
    // Validate Number
    if(!email && !number)
    {

      if (!number) {
        setNumberError('Please enter at least your phone number or email.');
        hasError = true;
      }
  
      // Validate Email
      if (!email.trim()) {
        setEmailError('Please enter at least your email or phone number.');
        hasError = true;
      }

    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(email)
    {
       if (!emailPattern.test(email)) {
        setEmailError('Please enter a valid email address');
        hasError = true;
      }
    }

    if (number.length>0 && number.length<10) {
      setNumberError('Enter valid phone number');
      hasError = true;
    }
    

    // Stop execution if there are validation errors
    if (hasError) return;

    try{
      setLoading(true)
      const data = {
        email,
        name,
        lastName,
        number:countryCode+number,
        website:userInfo.website,
        clinic:userInfo.clinicName,
        address:userInfo.Address,
        clinicNumber:userInfo.phone_number,
        businessMail:userInfo.businessMail,
        appCode:userInfo.appCode,
        smsChecked,
        emailChecked,
        userTimezone
      }
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
      const res = await axios.post(`${Node_API_URL}/api/post/addInstantPatient`,data,config);
      if(res.data.response==true)
      {
      setName("")
      setEmail("")
      setNumber("")
      setLastName("")
      if(smsChecked)
      {
        setSmsChecked(false)
      }
      if(emailChecked)
      {
        setEmailChecked(false)
      }
      todayPatients()   
      console.log(res.data);
      setModalMsg({head:"Registered" ,msg:res.data.msg});  
      setISModalOpen(true);
      }else{
        setModalMsg({head:"Failed" ,msg:res.data.msg}); 
        setISModalOpen(true);
      }
    }
      catch(e){
        console.error('Error adding patient:', e);
      }finally{
        setAddPatientModal(false);
        setLoading(false)
      }
  }

  const SearchByFilter = async (SearchType,query) => { 
    try { 
    const response = await axios.post(`${Node_API_URL}/api/post/searchPatientsByTypeAndLimit5`, 
      {
      type:SearchType,
      query:query
      }, 
      {
        headers: {
          "Authorization": `Bearer ${token}`,  
        },
      }
    ); 
      console.log(response.data.patients)
    if(response.data.response)
    {
      setAllPatients(response.data.patients);
    } 
    
  } catch (error) {
    console.error('Error while searching:', error);
  }


  }; 

  const closeAddPatientModal = () =>{
    if(smsChecked)
            {
              setSmsChecked(false)
            }
            if(emailChecked)
            {
              setEmailChecked(false)
            }
    setAddPatientModal(false)
  }



  return (
    <>
        
      {isModalOpen && ( 
        <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
      >
        <NewModal head={modalmsg.head} desc={modalmsg.msg} close={()=>{setISModalOpen(false)}} />
      </div>
      )}   
      <div className="flex fade-in-animation flex-col relative  w-[95vw]  md:w-[97%] xl:[100%] mx-auto  rounded-md mt-2 h-[481px] dark:bg-slate-800 justify-center items-center p-4">
        {/* add patient  */}
        <button
              className="bg-blue-500  text-white px-4 py-2 absolute top-[1vh] rounded-md mr-2"
              onClick={()=>setAddPatientModal(true)}
            >
             Add New Patient
        </button>
        {/* <br/> */}
        
        {addPatientModal && (
  <div className="fixed fade-in-animation inset-0 z-10 bg-slate-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white w-96 p-4 dark:bg-slate-900 rounded-lg shadow-lg">
      <h2 className="text-xl dark:text-white text-center font-bold mb-4">Add Patient</h2>

      <div className="mb-4">
        <label className="block dark:text-white text-gray-700 text-sm font-bold mb-2">
          First Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full dark:bg-slate-900 dark:text-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter patient's firstName"
        /> 
         {nameError && <p className="text-red-500 text-xs mt-2">{nameError}</p>}
      </div>

      <div className="mb-4">
        <label className="block dark:text-white text-gray-700 text-sm font-bold mb-2">
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="shadow appearance-none border rounded w-full dark:bg-slate-900 dark:text-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter patient's lastName"
        /> 
         {lastNameError && <p className="text-red-500 text-xs mt-2">{lastNameError}</p>}
      </div>

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
        {emailError && (
          <p className="text-red-500 text-xs italic">{emailError}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
          Number
        </label>
        <div className="flex items-center">
          {/* Country Code Dropdown */}
          <select
            value={countryCode}
            onChange={handleCountryCodeChange}
            className="shadow appearance-none border rounded dark:bg-slate-900 dark:text-white py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label} {country.code}
              </option>
            ))}
          </select>

          {/* Phone Number Input */}
          <input
            pattern="\d{10}"
            maxLength="10"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="shadow appearance-none border rounded dark:bg-slate-900 dark:text-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter patient's number"
          />
        </div>
          {numberError && <p className="text-red-500 text-xs mt-2">{numberError}</p>}
      </div>

      {/* Checkboxes for SMS and Email */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
          Contact Preference
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={smsChecked}
            onChange={(e) =>{
               if(!number)
               {
                alert('Enter patient valid phone number for sms notification')
                setSmsChecked(false)
               }
               else{
                 setSmsChecked(e.target.checked)}
                }
                }
            className="mr-2"
          />
          <label className="text-gray-700 dark:text-white mr-4">SMS</label>
          <input
            type="checkbox"
            checked={emailChecked}
            onChange={(e) => {
              const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
              if(!email)
               {
                alert('Enter email address.')
                setEmailChecked(false)
               }
               else if(!emailPattern.test(email)){
                alert('Enter valid email address.')
                setEmailChecked(false)
               }
                else{
                setEmailChecked(e.target.checked)}
                }

              
            }
            className="mr-2"
          />
          <label className="text-gray-700 dark:text-white">Email</label>
        </div>
      </div>

      {/* Centered Buttons */}
      <div className="flex w-full justify-center items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleAddPatient}
        >
          Add Patient
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={closeAddPatientModal}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

        {/* Setup Appointment */}

        <div className=" w-[95%] flex flex-col justify-between absolute top-[7vh] h-[80%]  p-4 mx-4">

          <h2 className="text-xl font-bold  text-center dark:text-gray-200">Setup Appointment</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1">
              Select Show Type
            </label>
            <select
  className="block w-full p-2 border border-gray-300 rounded-md"
  value={ShowPatientType}
  onChange={(e) => {
    const value = e.target.value; // Get the new value
    setShowPatientType(value); // Log the selected patient type
    if(value == 'search')
    {
      setAllPatients([])
      setSelectedPatient("")
      setSearchMode(true)
    }else if(value == "today"){
      todayPatients()
      setSearchMode(false)
    }else{
      fetcAllPatients()
      setSearchMode(false)
    }
  }}
>
                <option  value={'today'}>Today's Patient</option>
                <option  value={'all'}>All Patient</option>
                <option  value={'search'}>Search</option>

            </select>
          </div>
          <div className=" mt-2 mb-2">
            {
              searchMode && (
                <>
                
          <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1">
              Search for patient
            </label>
          <input
                type='text'
                className='p-2 block w-full rounded-md ' 
                placeholder="Search for patient"
                onChange={(e)=>SearchByFilter('name',e.target.value)}
                
              />
            <br/>
              </>
              )
            }

            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
            <option value="">Select a patient</option>
          {ShowPatientType === "today" ? (
            TodayPatient.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.fullName} - {patient.email}
              </option>
            ))
          ) : (
            AllPatients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.fullName} - {patient.email}
              </option>
              )))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium dark:text-gray-200 text-gray-700 mb-1">
              Appointment Date & Time
            </label>
            <DatePicker
              className="block w-full p-2 border border-gray-300 rounded-md"
              selected={appointmentDate}
              onChange={(date) =>{setAppointmentDate(date)}}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          {/* Checkboxes for SMS and Email */}
      <div className=" flex gap-4 mt-4">
        <label className="block mt-2 text-gray-700 dark:text-white text-sm font-bold mb-2">
          Contact Preference
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={smsChecked}
            onChange={(e) => setSmsChecked(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700 dark:text-white mr-4">SMS</label>
          <input
            type="checkbox"
            checked={emailChecked}
            onChange={(e) => setEmailChecked(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700 dark:text-white">Email</label>
        </div>
      </div>

          <div className=" flex justify-center items-center ">
            <button
              className="bg-blue-500 text-white mt-7 xl:mt-0 px-4 py-2 rounded-md "
              onClick={handleSchedule}
            >
              Schedule Appointment
            </button>
          </div>
        </div>


        {/* Filter Date Modal */}
        <Modal
          isOpen={showFilterModal}
          onRequestClose={handleCloseCalendar}
          className="flex items-center justify-center h-full"
          overlayClassName="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Calendar
              onChange={handleDateChange}
              value={filterDate}
              className="react-calendar"
            />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleCloseCalendar}
            >
              Close
            </button>
          </div>
        </Modal>


      </div>
    

    </>
  );
};

export default AppointmentSetup;