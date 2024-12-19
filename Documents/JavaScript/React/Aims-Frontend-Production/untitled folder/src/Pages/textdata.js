import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar/sidebar'; 
import Text from '../Components/ConsultationOptions/Text';
import { useState, useEffect } from 'react';  
import { useContext } from 'react'; 
import { GlobalStateContext } from '../Context/GlobalStateContext'; 
import { useNavigate } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
const TextData = (props) => {   
  const {patientId} = useParams();
  const navigate = useNavigate();
  const  { ConsultationType , setConsultationType , SelectedConsultation , setSelectedConsultation} = useContext(GlobalStateContext);  
  const [isOn, setIsOn] = useState(false);
  const [Switch, setSwitch] = useState(true);
const HandleSwitch = () => { 
  setIsOn((prevState) => !prevState); 
} 


  return (
    <div>
      <Navbar name={props.name} />

      <div className='flex'>
      <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
        <div className='m-0  md:ml-64  h-full w-full flex-col items-center dark:bg-slate-900'> 
        <div className=' md:flex items-center mt-5'>
        {Switch && (  
          <>
        <span className='flex justify-center mx-auto rounded-md items-center gap-3 w-[300px] dark:bg-slate-800 mt-5 p-4 text-gray-300 cursor-pointer'>  
          <p> {isOn ? 'Raw Text' :'Upload Audio'} </p>
 <input onChange={HandleSwitch} type="checkbox" checked={isOn} id="checkboxInput"></input>
    <label for="checkboxInput" class="toggleSwitch">
    </label>
    </span>  

</>
    )} 
           <style jsx> 
        { 
          `
        #checkboxInput {
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

#checkboxInput:checked + .toggleSwitch::after {
  transform: translateX(20px); /* Move to the full width of the toggle */
  background-color: white;
}

#checkboxInput:checked + .toggleSwitch {
  background-color: rgb(79 70 229);
  transition-duration: 0.2s;
}

          `
        }
      </style>
    </div>
          <Text ON={isOn} setON={setIsOn} setSwitch={setSwitch} Switch={Switch}/>
        </div>
      </div>
    </div>
  );
};

export default TextData;
