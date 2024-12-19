import React,{ useEffect,useState} from 'react'
import {Button} from "@material-tailwind/react";
import {Link}from 'react-router-dom'
import './choose.css'
import img from "../images/im1-removebg-preview.png"
import Loading from'./loading.js'

const Choose = (props) => {


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch data from your Django backend
    console.log(props.name)

    setLoading(true)
    console.log(props.name)
    if (props.name !== undefined)
    {
      console.log("done")
      setLoading(false)}

    }
    
    ,[props.name])




    return (      
      <>
      {loading ? (
        <Loading />
        // <Spinner />
      ):(
        
      <>

        <div className="container bg-slate-300 shadow-xl mt-8 ">         
         <div><h1 className='text-3xl text-bb font-extrabold text-center p-8 '>Welcome Back {props.name}</h1></div>
        <div className="flex" >
            <div className="item bg-gradient-to-r from-gray-400/50 to-blue-400/50 border-2  border-blue-500" >
                    <div className="name pb-6 text-3xl tracking-tight mb-2 mt-4 pt-4 item-start inline-block text-white">New Consultation</div>
                    {/* <div class="des text-left text-m text-bold font-mono">New patient! Let's Start a new consultation</div> */}
                    <Link to="/form">
                    <Button  size="lg"
                    variant="gradient"
                    color="light-blue"  
                    className="bg-bb  m-4 flex mb-1 mt-4">Let's Start {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg></Button>   </Link>         </div>
                   <div className="item bg-gradient-to-r from-gray-400/50 to-blue-400/50 border-2  border-red-700" >
                              <div className="name p-2 text-3xl tracking-tight mb-1 mt-4 pt-4 item-start text-white ">Show Previous Reports</div>
                              <Link to="/patient"> <Button  size="lg"
                                    variant="gradient"
                                    color="light-blue"  
                                    className="bg-bb  m-4 flex mb- mt-0">Let's Start {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg></Button>  </Link>           </div>
                 
                      <div className="item bg-gradient-to-r from-gray-400/50 to-blue-400/50 border-2  border-blue-500" >
                              <div className="name pb-4 text-3xl tracking-tight mb-8 mt-4 pt-4 item-start text-white ">Settings</div>
                              {/* <div class="des text-left text-m text-bold font-mono">New patient! Let's Start a new consultation</div> */}
                              <Button  size="lg"
                                    variant="gradient"
                                    color="light-blue"
                                   className="bg-bb  m-4 flex mt-15 mb-4 ">Let's start{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg></Button>            </div> 
                  <div className="item bg-gradient-to-r from-gray-400/50 to-blue-400/50 border-2 border-blue-500" >
                    <div className="p-2 name pb-6 text-3xl tracking-tight mb-2 mt-4 pt-4 item-start inline-block text-white">Help</div>
                    {/* <div class="des text-left text-m text-bold font-mono">New patient! Let's Start a new consultation</div> */}
                    <Link to="/form">
                    <Button  size="lg"
                    variant="gradient"
                    color="light-blue"  
                    className="bg-bb  m-4 flex mb-2 mt-4">Let's Start {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg></Button>   </Link>         </div>
        <div className="item bg-gradient-to-r from-gray-400/50 to-blue-400/50 border-2 border-red-700" >
                    <div className="name p-2 pb-6 text-3xl tracking-tight mb-2 mt-4 pt-4 item-start inline-block text-white">How to use</div>
                    {/* <div class="des text-left text-m text-bold font-mono">New patient! Let's Start a new consultation</div> */}
                    <Link to="/form">
                    <Button  size="lg"
                    variant="gradient"
                    color="light-blue"  
                    className="bg-bb  m-4 flex mb-2 mt-4">Let's Start {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg></Button>   </Link>         </div>
            
        </div>
       <div><img src={img} class=" pl-4 pb-2 mt-20 mb-0" alt="Flowbite Logo" /></div>
    </div>
    
    </>)}</>
    );
  };

export default Choose