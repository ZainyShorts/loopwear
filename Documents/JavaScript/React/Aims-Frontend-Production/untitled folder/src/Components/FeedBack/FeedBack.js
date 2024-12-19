import React, { useState } from 'react'
import { Node_API_URL } from '../../client.js'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import Footer from '../Footer/Footer.js';

const FeedBack = () => {
  return (
    <>

    <div className='flex-col '>
        <ToastContainer/>
        <MapAndForm/>
        </div>
    </>
  )
}

const MapAndForm=()=>{
    const [email,setEmail]=useState("")
    const [msg,setMsg]=useState("")

    const sendFeedBack = async(e)=>{
        try{
            e.preventDefault()
            const res = await axios.post(`${Node_API_URL}/api/post/sendFeedBack`,{email,msg})
            if(res.data.success == true)
            {
                setEmail("")
                setMsg("")
                toast.success(res.data.msg)
            }else{
                toast.error(res.data.msg)
            }
        }catch(e)
        {
            toast.error("Failed request. Try again later")
        }
    }
    return (
        <>

<div id="contact" class="dark:bg-slate-900 h-[85vh]">
      <div class=" mx-auto pt-8">
        <div class="flex flex-col gap-3 items-center">
          <h1 class="text-indigo-600 font-bold">FEEDBACK</h1>
          <h1 class="text-3xl dark:text-white">Have a Question?</h1>
          <p class="w-1/2 text-center text-gray-400">
            Do you have an idea? Let's discuss it and see what we can do
            together.
          </p>
        </div>
        <form class="mt-5 p-8 flex flex-col gap-5 items-center">
          <input
             required type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email"
            class="p-2 w-full md:w-1/2 ring-1 ring-indigo-300 rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
            
            placeholder="Email"
          />
          <textarea
            required id="message" name="message" value={msg} onChange={(e)=>setMsg(e.target.value)} 
            class="p-2 w-full md:w-1/2 ring-1 ring-indigo-300 rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
            cols="30"
            rows="10"
            placeholder="Message..."
          ></textarea>
          <button
             onClick={(e)=>sendFeedBack(e)} 
            class="w-1/2 bg-indigo-600 text-white font-medium px-3 py-2 rounded-md cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
      <Footer/>

        </>
    )
}

export default FeedBack