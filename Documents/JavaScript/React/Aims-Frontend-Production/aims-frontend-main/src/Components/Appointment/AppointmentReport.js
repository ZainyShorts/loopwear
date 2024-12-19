import React, { useContext, useEffect, useState } from 'react'
import { GlobalStateContext } from '../../Context/GlobalStateContext'
import axios from 'axios'
import { Node_API_URL } from '../../client'
import AppointmentModal from './Modal/AppointmentModal'  
import { RiFileExcel2Fill } from "react-icons/ri"; 
import * as XLSX from 'xlsx'; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordian/Accordian.js'


import Loader from './Loading'
const AppointmentReport = () => {
    const {token ,userTimezone} = useContext(GlobalStateContext) 
    const [showAppointments , setShowAppointments ] = useState([]); 
    const [showModal , setShowModal] = useState(false); 
    const [Loading, setLoading] = useState(false);
    const [report,setReport] = useState({
        Scheduled:0, Cancelled:0, Complete:0,Pending:0,All:0
    }) 
  const [types , setTypes ] = useState(['Scheduled', 'Cancelled' , 'Complete' , 'Pending', 'All'])
    useEffect(()=>{
        getbyDateAppointment()
    },[])
   const FetchAppointment = async (status) => {    
    setLoading(true); 
 
   try {  
    const res = await axios.get(
      `${Node_API_URL}/api/get/allAppointments?status=${status}&userTimezone=${userTimezone}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );  
    console.log(res.data.appointments);
        if (res.data.response === true ) {
          setShowAppointments(res.data.appointments);    
        }  
        setShowModal(true); 
   } 
   catch(e) { 
     console.log("Error " , e);
   } 
   finally{ 
    setLoading(false);
   }
   }  
   const DownloadAppointments = async (status) => {    
    setLoading(true); 
 
   try {  
    const res = await axios.get(
      `${Node_API_URL}/api/get/allAppointments?status=${status}&userTimezone=${userTimezone}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );  
    console.log(res.data.appointments);
    if (res.data.response === true) {
      setShowAppointments(res.data.appointments);
    
      const worksheetData = res.data.appointments.map(({ name, email, status, time }) => ({
        name,
        email,
        status,
        time,
      }));
    
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');
    
      // Set the file name and download the Excel file
      const fileName = `Appointments${status}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    }
     
   } 
   catch(e) { 
     console.log("Error " , e);
   } 
   finally{ 
    setLoading(false);
   }
   } 
   const onClose = () => { 
    setShowModal(false);
   }
    const getbyDateAppointment = async(date)=>{
     
        try{
          const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        
          const res = await axios.get(`${Node_API_URL}/api/get/appointmentReport`,config)
          console.log(res.data)
          setReport(res.data.report)

        }catch(e)
        {
          console.log('error')
        }
      } 

  return (
    <>    
          <Accordion type="single" defaultValue="item-1" collapsible className="w-full p-2 pr-1">
          <AccordionItem value="item-1">
       <div className='dark:bg-slate-900 mr-1 ml-1'> 
          <AccordionTrigger>  
            <div className='text-3xl font-bold p-2 '> Appointment Reports </div>    
            </AccordionTrigger>           
            <AccordionContent>
          {Loading && 
        <div className='fixed inset-0 h-screen z-50 flex justify-center  items-center ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}> 
       <Loader/>
       </div> 
} 


        {showModal && 
        <div className='fixed inset-0 h-screen z-50 flex justify-center  items-center ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}> 
       <AppointmentModal data={showAppointments} onClose={onClose}/>
       </div> 
}    
    <div className='flex  items-center  justify-evenly flex-col lg:flex-row '>
        {types.map((type,index) => ( 
          <> 
       <div className='w-[80%] lg:w-[16%] flex flex-col items-center  fade-in-animation p-1 '>
        <div onClick={()=>FetchAppointment(type)} key={index} class="card cursor-pointer ">
    <div  class="title">
     
            <img className='w-4 h-4 ' src='./calendarIcon.png'  />
        <p class="!text-white flex title-text ">
            {type} 
        </p>
    </div>
    <div class="data ">
        <p className='!text-white' >
         {report[type]}
        </p>
        
    </div>
</div>   
 <div onClick={()=>{DownloadAppointments(type)}} className=' bg-blue-500 p-1 flex justify-center gap-1 items-center rounded-md mt-2 text-center text-white cursor-pointer  w-[250px] lg:w-full'> 
  Download 
  <RiFileExcel2Fill/>
 </div> 
 </div>
</>
 ))}  
 </div>
     </AccordionContent> 
     </div> 
        </AccordionItem>
      </Accordion>
        <style>{`
/* From Uiverse.io by Yaya12085 */ 
.card {
  padding: 1rem;
  background-color: #1e293b;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  height:120px;
  width:100%;
  border-radius: 10px;
} 
  @media screen and (max-width: 1280px) {
    .card{  
    width:97%;
    margin-top:10px; 
    margin-bottom:10px; 
    margin-left:auto; 
    margin-right:auto;
    }
} 
      @media screen and (max-width: 768px) {
    .card{  
    width:95vw; 
  \
    } 
}



.title {
  display: flex;
  align-items: center;
}

.title span {
  position: relative;
  padding: 0.5rem;
  background-color: #10B981;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
}

.title span svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  height: 1rem;
}

.title-text {
  margin-left: 0.5rem;
  color: #374151;
  font-size: 18px;
}

.percent {
  margin-left: 0.5rem;
  color: #02972f;
  font-weight: 600;
  display: flex;
}

.data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.data p {
  margin-top: 1rem;
  margin-bottom: 1rem; 
  margin:0 , 0 , 3px ,3px;
  color: #1F2937;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  text-align: left;
}

.data .range {
  position: relative;
  background-color: #E5E7EB;
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
}

.data .range .fill {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #10B981;
  width: 76%;
  height: 100%;
  border-radius: 0.25rem;
}
`}</style>
    </> 
  )
}

export default AppointmentReport