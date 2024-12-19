import React from 'react'
import { AiOutlineClear } from "react-icons/ai";
import { useContext } from 'react'; 
import { GlobalStateContext } from '../../Context/GlobalStateContext';  
import { isMobile } from 'react-device-detect';
import { IoMdArrowRoundBack } from "react-icons/io"; 

const AimsNavbar = ({name}) => {   

  const handleChange = (event) => {
    setSelectedOption(event.target.value); 
  };
 const options = ['gpt-4o-mini', 'gpt-4', 'gpt-4o', 'gpt-3.5-turbo-16k']; 
  const {ClearChat,navigate ,setClearChat , get ,setSelectedOption , selectedOption} = useContext(GlobalStateContext);  
  return (
    <nav className='dark:bg-slate-800 text-white flex md:ml-64 p-6 justify-between'>
   {!isMobile ? <div className='flex gap-4 justify-center items-center'> <p > Aims-Assistant </p>  
     <div className='flex gap-2 items-center'>
      <select
        id="dropdown"
        className="dropdown-select text-sm  text-gray-300 dark:bg-slate-800 border-[1px] border-gray-600 rounded-[5px] p-[4px]"
        value={selectedOption}
        onChange={handleChange}
      >
      
        {options.map((model)=>( 
          <option value={model}>{model}</option>
        ))}
      </select> 
      </div> </div> : <IoMdArrowRoundBack  className='cursor-pointer ' onClick={()=>navigate('/TodayPatients')} size={25} />}   
 
      {get ? (
    <div onClick={() => setClearChat(prevState => !prevState)} className='flex gap-2 cursor-pointer'> 
    <p className='hidden md:block'>  Clear Chat</p>   
    <AiOutlineClear className='h-[22px] w-[25px]  text-white' />
    </div>
      ): 
     null
     }

    <p> Dr {name.first_name} {name.last_name} </p>
    </nav>
  )
}

export default AimsNavbar
