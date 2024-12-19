/*eslint-disable*/
import React,{ useContext, useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Node_API_URL } from "../../client";
import moment from 'moment';
import { GlobalStateContext } from "../../Context/GlobalStateContext";
import { useSelector } from "react-redux";

function Calendar({CalendarState,getCalenderDates,events}) {
  // const [events, setEvents] = useState([]);
  const [showAppt,setShowAppt]=useState(false)
  const { userInfo } = useSelector((state)=>state.auth)
  const { token , navigate , showToast , userTimezone} = useContext(GlobalStateContext)
  const [loading,setLoading]=useState(false)
  const [scheduledAppointments,setScheduledAppointments]=useState([])
  const [showEditModal,setShowEditModal]=useState(false)
  const [currentEditAppointment, setCurrentEditAppointment] = useState(null);
  const [editId,setEditId]=useState("")

 

  const getbyDateAppointment = async(date)=>{
  setLoading(true)
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
    if(res.data.success==true)
    {
      setScheduledAppointments(res.data.appointments)
    }
  }catch(e)
  {
    console.log('error')
  }finally{
    setLoading(false)
  }
  }

  useEffect(()=>{
    getCalenderDates()
  },[CalendarState])


  const handleDateClick = (info) => {
    const clickedEvent = events.find(event => event.start === info.dateStr);
    
    if (clickedEvent) {
      // alert(`Clicked date: ${info.dateStr}, ID: ${clickedEvent.extendedProps.id}`);
      getbyDateAppointment(info.dateStr)
      setShowAppt(true)
    } else {
      // alert(`Clicked date: ${info.dateStr}, No event found`);
    }
  };

  function formatCreatedAt(createdAt) {
    return moment(createdAt).format('MM/DD/YYYY, h:mm A');
  }

  const delAppointment = async(appId)=>{
    try{
      setLoading(true)
      const data = {
        appId,
      }
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
      const res = await axios.post(`${Node_API_URL}/api/del/delAppointment`,data,config);
      if(res.data.success==true)
      {
        getCalenderDates()
        setShowAppt(false)
      }
    }
      catch(e){
        console.log('error')
      }finally{
        setLoading(false)
      }
  }


  const handleUpdateAppointment = (appId,time) => {
      setEditId(appId)
      setCurrentEditAppointment(new Date(time));
      setShowAppt(false);
      setShowEditModal(true);

  };


  const editAppTime = async(appId)=>{
    try{
      setLoading(true)
      const data = {
        website:userInfo.website,
        clinic:userInfo.clinicName,
        appId,
        time:currentEditAppointment,
        number:userInfo.phone_number,
        businessMail:userInfo.businessMail,
        appCode:userInfo.appCode,
        userTimezone
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
        getCalenderDates()
        setShowEditModal(false)
        showToast('Appointment Time updated');
      }
    }
      catch(e){
        console.log('error')
      }finally{
        setLoading(false)
      }
  }
  



  return (
    <>

    <div className="dark:bg-slate-900 mt-2 fade-in-animation  text-gray-300  w-[95vw] md:w-[calc(100vw-285px)] xl:w-[100%] mx-auto md:mx-2">
  <div className="dark:bg-slate-800 p-4 rounded-md cursor-pointer">
    <Fullcalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      headerToolbar={{
        start: "today prev,next", // will normally be on the left. if RTL, will be on the right
        center: "title",
        end: "dayGridMonth", // will normally be on the right. if RTL, will be on the left
      }}

      height={"450px"}

      events={events}
      
      dateClick={handleDateClick}
      />
  </div>

  {/* Scheduled Appointments */}
  { showAppt &&  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div
      className="fixed inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm"
      onClick={() => setShowAppt(false)}
    ></div>
  
    {/* Modal content */}
    <div className="bg-white dark:bg-slate-800 w-full max-w-2xl p-6 rounded-lg shadow-lg z-10 mx-4">
      <h2 className="text-xl font-bold mb-4 dark:text-gray-200 text-center">
        Scheduled & Pending Appointments
      </h2>
      <br />
      
      {scheduledAppointments.length > 0 ? (
        scheduledAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex justify-between items-center mb-4 p-3 border rounded-md"
          >
            <div>
              <p className="font-bold dark:text-white">{appointment.name}</p>
              <p className="dark:text-white">{formatCreatedAt(appointment.time)}</p>
            </div>
            <div className="flex items-center">
              <button onClick={() => navigate(`/Consultation/${appointment.patientID}`)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                Start
              </button>
              <button onClick={() => delAppointment(appointment._id)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                Delete
              </button>
              <button onClick={()=> handleUpdateAppointment(appointment._id,appointment.time)} className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">No scheduled appointments.</p>
      )}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => setShowAppt(false)}
      >
        Close
      </button>
    </div>
  </div>
  }
{/* Edit Appointment Modal */}
{showEditModal && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white dark:bg-slate-900 w-96 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>

      <DatePicker
        className="block w-full p-2 border dark:bg-slate-800 border-gray-300 rounded-md"
        selected={currentEditAppointment}
        onChange={(date) => setCurrentEditAppointment(date)}
        showTimeSelect
        dateFormat="Pp"
      />

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => editAppTime(editId)}
        >
          Save
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowEditModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


        

</div>
      </>

  );

  function newFunction() {
    return '';
  }
}

export default Calendar;




