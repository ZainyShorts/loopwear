import React from 'react'
import Sidebar from '../Components/Sidebar/sidebar.js';
import Navbar from '../Components/Navbar.js'; 
import { useEffect } from 'react';
import { useState } from 'react';
const Invoice = (props) => { 
  const [reports,setReports] = useState([{ 
    p: " Click to see Report"
  }, 
  { 
    p: " Click to see Report"
  }, 
  { 
    p: " Click to see Report"
  }, 
  { 
    p: " Click to see Report"
  }, 
  { 
    p: " Click to see Report"
  },  
  { 
    p: " Click to see Report"
  }
]) 
 useEffect(()=>{ 
  alert("The Page is under development");
 },[]);
  return (
    <>

<Navbar name={props.name} />
    <div className='fixed h-full top-0 left-0 hidden md:block '>
      <Sidebar />
    </div>
    <div className=' md:ml-64 dark:bg-slate-900 ' > 
      <div className='grid grid-cols-3 gap-3 p-3 '>
      {reports.map((rep)=> (
<div className="card ">
    <h2>{rep.p}</h2>
</div>
      ))}
           </div>  
       </div> 
   <style jsx> 
   { 
` 
/* From Uiverse.io by bhaveshxrawat */ 
.card {
  width: 25vw;
  height: 254px;
  background: #595958;
  position: relative;
  display: flex;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
}

.card h2 {
  z-index: 1;
  color: white;
  font-size: 2em;
}

.card::before {
  content: '';
  position: absolute;
  width: 100px;
  background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
  height: 130%;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.2s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card::after {
  content: '';
  position: absolute;
  background: #07182E;
  ;
  inset: 5px;
  border-radius: 15px;
}  
/* .card:hover:before {
  background-image: linear-gradient(180deg, rgb(81, 255, 0), purple);
  animation: rotBGimg 3.5s linear infinite;
} */



`
   }
 </style>
    </>
  )
}

export default Invoice
