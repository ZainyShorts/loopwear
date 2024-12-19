import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/sidebar'; 
import Recording from '../Components/ConsultationOptions/Transcribing';
import NewModal from '../Components/ui/NewModal/NewModal';
import { useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import MedicalReport from '../Components/ConsultationOptions/MedicalReport';
const Transcribe = (props) => {   
  const {patientId} = useParams();
  const [isOn, setIsOn] = useState(false);  
  const [isCentered , setIsCentered] = useState(false);
  const [Switch, setSwitch] = useState(true);  
  const [visitOn , setVisitON] = useState(false); 
  const [visitSwitch , setVisitSwitch] = useState(true);
  const [isMedical , setIsMedical] = useState(false);
const HandleSwitch = () => { 
  setIsOn((prevState) => !prevState); 
}   

 const ShowVisit = () => { 
  setVisitON((prevState) => !prevState);  
  setIsMedical((prevState) => !prevState);
 } 
 const setMsg = (data) => { 
  setModalMsg({head : data.head , desc : data.msg }) 
  setIsModalOpen(true);
 }
 const close = () => { 
  setIsModalOpen(false); 
  ShowVisit();
 }
 const [modalmsg , setModalMsg] = useState(null); 
 const [isModalopen , setIsModalOpen] = useState(false);
  return (
    <div>   
       {isModalopen && ( 
     <div
     className="fixed inset-0 flex items-center justify-center z-50"
     style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
   >
     <NewModal head={modalmsg.head} desc={modalmsg.desc} close={close} />
   </div>
   )}


      <Navbar name={props.name} /> 


      <div className='flex'>
      <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
        <div className='m-0  md:ml-64  h-full w-full items-center pl-4 pr-4 dark:bg-slate-900'>  
        {Switch && (  
          <> 
          <div className='flex justify-center'>
        <span className='flex  justify-center mx-auto rounded-md items-center gap-3 w-[300px] dark:bg-slate-800 mt-5 p-4 text-gray-300 cursor-pointer'>  
          <p> {!isOn ?  'Live Transcription' : 'Record Audio'} </p>
 <input onChange={HandleSwitch} type="checkbox" checked={isOn} id="checkboxInput"></input>
    <label for="checkboxInput" class="toggleSwitch">
    </label>
    </span>  
       
    </div>
    </> 
    )}      
       {patientId === 'Quick' ? (
  null
) : (
  visitSwitch && (
    <>
      <div className="flex justify-center">
        <span className="flex justify-center mx-auto rounded-md items-center gap-3 w-[300px] mt-5 p-2 text-gray-300 cursor-pointer">
          <p>{!visitOn ? 'Show Previous Visit' : 'Hide Previous Visit'}</p>
          <input
            className="h-6"
            onChange={ShowVisit}
            type="checkbox"
            checked={visitOn}
            id="checkboxInput2"
          />
          <label htmlFor="checkboxInput2" className="toggleSwitch2"></label>
        </span>
      </div>
    </>
  )
)}

   {patientId === 'Quick' ? (
  null 
) :   <div className='flex  justify-center p-6' > </div>} 
    <div className={`flex ${isCentered ? 'justify-between' : 'justify-center'} dark:bg-slate-900`}
      >  <div className={` flex transition-transform duration-500 ease-in-out  `}> 
        <Recording ON={isOn} setON={setIsOn} setSwitch={setSwitch} Switch={Switch} visit={visitOn} />  
          </div>  
          {isMedical &&   
          <div className='p-2'> 
          <MedicalReport id={patientId} setModalMsg={setMsg}/> 
          </div>
          }
        </div>
        </div>
      </div> 
      <style jsx> 
        { 
          `
        #checkboxInput {
  display: none;
} 
    #checkboxInput2 {
  display: none;
}

.toggleSwitch {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 50px;
  height: 30px;
  background-color: rgb(82, 82, 82);
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.2s;
} 
  .toggleSwitch2 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 50px;
  height: 30px;
  background-color: rgb(82, 82, 82);
  border-radius: 20px;
  cursor: pointer;
  transition-duration: 0.2s;
}

.toggleSwitch::after {
  content: "";
  position: absolute;
  height: 20px; /* Adjusted height to fit better */
  width: 20px; /* Adjusted width to fit better */
  left: 5px;
  background-color: transparent;
  border-radius: 50%;
  transition: transform 0.2s, background-color 0.2s;
  box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
  border: 5px solid white;
}
 

.toggleSwitch2::after {
  content: "";
  position: absolute;
  height: 20px; /* Adjusted height to fit better */
  width: 20px; /* Adjusted width to fit better */
  left: 5px;
  background-color: transparent;
  border-radius: 50%;
  transition: transform 0.2s, background-color 0.2s;
  box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
  border: 5px solid white;
}

#checkboxInput:checked + .toggleSwitch::after {
  transform: translateX(20px); /* Move to the full width of the toggle */
  background-color: white;
}

#checkboxInput:checked + .toggleSwitch {
  background-color: rgb(79 70 229);
  transition-duration: 0.2s;
} 
  #checkboxInput2:checked + .toggleSwitch2::after {
  transform: translateX(20px); /* Move to the full width of the toggle */
  background-color: white;
}

#checkboxInput2:checked + .toggleSwitch2 {
  background-color: rgb(79 70 229);
  transition-duration: 0.2s;
}

          `
        }
      </style>
    </div>
  );
};

export default Transcribe;
