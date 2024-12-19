import React, { useState } from 'react'
import Sidebar from "../Components/sidebar.js";
import Navbar from "../Components/Navbar";  
import AppointmentSetup from '../Components/Appointment/AppointmentSetup.js';
import Calendar from '../Components/Appointment/calander.js'; 
import AppointmentStatus from "../Components/Appointment/AppointmentStatus.js"; 
import AppointmentReport from '../Components/Appointment/AppointmentReport.js'; 
import {useEffect } from 'react';   
import Loader from '../Components/ui/Loader/Loader'
import { useContext } from 'react';  
import { GlobalStateContext } from '../Context/GlobalStateContext.js';
import { Node_API_URL } from '../client.js';
import axios from 'axios';  
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../Components/ui/Accordian/Accordian.js'



function AppoitmentSelection() { 
  const {setAppointmentRender , AppointmentRender} = useContext(GlobalStateContext);
  const [CalendarState,setCalendarState]=useState(false); 
  const [events, setEvents] = useState([]);  

  const getCalenderDates = async() =>{
    
    try{
      const data = {
        _id:localStorage.getItem("doc_id"), 
        // status:['Pending', 'Scheduled'] 
      }

      const res = await axios.post(`${Node_API_URL}/api/get/calenderDates`,data)
      console.log(res)
      if(res.data.response == true)
      {
        const groupedAppointments = res.data.appointments.reduce((acc, item) => {
          const date = item.time.slice(0, 10); // Extract the date
          if (!acc[date]) {
            acc[date] = { count: 0, ids: [] }; // Initialize with count and IDs
          }
          acc[date].count += 1; // Increment the count
          acc[date].ids.push(item._id); // Collect the appointment IDs
          return acc;
        }, {});


        // Create the formatted events array
        const formattedEvents = Object.entries(groupedAppointments).map(([date, details]) => ({
          title: details.count.toString(), // Show the count as the title
          start: date, 
          backgroundColor: "#ffffff", // White backgroun
          extendedProps: { ids: details.ids } // Include all IDs for that date
        }));
        
        setEvents(formattedEvents);

      }

    }catch(e)
    {
      console.log(e)
    }
  }
  
  return ( 
    <div> 
     

    <Navbar  />

  <div className='flex dark:bg-slate-900 overflow-hidden'>
  <div className='fixed h-full top-0 left-0 hidden md:block '>
  <Sidebar />
</div>
    <div className='dark:bg-slate-900 relative md:ml-64  xl:flex flex-wrap justify-evenly mt-6 gap-2  h-full w-full'>
  
 
          <AppointmentReport/> 
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full p-2">
          <AccordionItem value="item-1">  
          <div className='dark:bg-slate-900 mr-1 ml-1'>
          <AccordionTrigger >       
            <div className='text-3xl font-bold p-2'> Set Appointment and view Calendar </div> 
            </AccordionTrigger>   
            <AccordionContent>
          <div className=' xl:flex gap-1  xl:w-[calc(100vw-275px)]'> 
        <div className='xl:w-[35%]' >
      <AppointmentSetup setCalendarState={setCalendarState}   />  
      </div> 
      {AppointmentRender && ( 
<div
  className="fixed inset-0 z-50 flex items-center  justify-center min-h-screen w-full"
  style={{ backgroundColor: 'rgba(31, 48, 55, 0.5)' }} 
>
  <Loader />
</div>
) } 
   <div className='xl:w-[64.5%]'> 
        <Calendar getCalenderDates={getCalenderDates} events={events}  CalendarState={CalendarState} />
      </div>    
      </div>  
      </AccordionContent> 
      </div>
      </AccordionItem> 
      </Accordion>  
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full p-2 pr-1">
        <AccordionItem value="item-1">  
          <div className='dark:bg-slate-900 mr-1 ml-1'>
          <AccordionTrigger>       
            <div className='text-3xl font-bold p-2'> Appointment Status </div> 
          </AccordionTrigger>   
          <AccordionContent> 
          <AppointmentStatus  getCalenderDates={getCalenderDates}  />  
          </AccordionContent> 

          </div>
      </AccordionItem> 
      </Accordion>  
      </div>   
    
    <style jsx> 
      { 
        ` 
        .xl-flex-row-important {
  @apply xl:flex-row !important;
}
        `
      }
    </style> 
   
    </div>
  </div>

  )
}

export default AppoitmentSelection
