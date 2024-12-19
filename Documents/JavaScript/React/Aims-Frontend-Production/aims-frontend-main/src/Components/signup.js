import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from "@material-tailwind/react";
import { makeStyles } from '@material-ui/core/styles';
import { REGISTER_URL } from "../client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";import { BiUser } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";

const Signup = () => {
  const [alert,setalert]=useState(false)
  const [post,setPost]=useState(false)
  const [check,setCheck]=useState(false)



  const [formData, setFormData] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "phone_number":"",
    "Address":"",
    "title":"",
    "speciality":"",
    "base":"",
    "responsible":"",
    "password": "",
    "re_password": "",
    "clinicName":""
})

const { first_name, last_name, email,phone_number, Address,title,speciality, base,responsible, password, re_password,clinicName} = formData

const navigate = useNavigate()

useEffect(()=>{
  navigate('/login')
},[])


const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    })
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()
    if(!check){
      return
    }
     setPost(true)
      const userData = {
            first_name,
            last_name,
            email,
            phone_number,
            Address,
            title,
            speciality,
            base,
            responsible,
            password,
            re_password,
            clinicName
      }
      const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

      try{
        
        const res = await axios.post(REGISTER_URL, userData, config)
        console.log(res)
        if(res.data.response === true)
            {
              toast.success(res.data.msg);
              setTimeout(()=>navigate("/login"),2000);
              
            }
        else
            {
              toast.error(res.data.msg);
            }
        }
        catch(e)
        {
            toast.error("Network Error");
        }
        finally{
          setPost(false)
        }

     
      
      
      

    
}






  return (
    <>
        {alert? (<div><Alert color="red">user already exists. Please verify your informations.</Alert>
        </div>) : null}
    <ToastContainer />
    
<div class="min-h-screen py-40 
       bg-gradient-to-r  from-indigo-200 dark:from-slate-800 dark:to-slate-900 
        " >
      <div class=" mx-auto px-6">
        <div class="flex flex-col  w-10/2 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
         
          <div class="w-full  py-16 px-12">
            <Link to={'/login'} className='flex items-center cursor-pointer'>
            <IoMdArrowRoundBack/> 
            <h5>Back to Login</h5>
            </Link>
            <br/>
            <h2  class="text-3xl mb-4">Register</h2>
            <p class="mb-4">
              Create your account.
            </p>
            {/* <form > */}
              <div class="grid md:grid-cols-2 grid-cols-1 gap-5">
                <input 
                 name="first_name"
                 value={first_name}
                 onChange={handleChange}
                //  required
                 type="text" placeholder="First Name" class="border border-gray-400 pl-3  py-1 pz-2 rounded-lg"/>

                <input
                 type="text"
                 name="last_name"
                 value={last_name}
                 onChange={handleChange}
                //  required
                  placeholder="Last Name" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
              </div>
              <br/>
              <div class="grid  md:grid-cols-2 grid-cols-1 gap-5">
                <input
                 type="email"
                 name="email"
                 id="email"
                 value={email}
                 onChange={handleChange}
                 //  required
                 autoComplete="email"
                  placeholder="Email" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>

                <input
                type="number"
                name="phone_number"
                id="phone_number"
                value={phone_number}
                //  required
                onChange={handleChange}
                placeholder="Phone Number" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
              </div>
              <br/>
              <div class="grid  md:grid-cols-2 grid-cols-1 gap-5">
                <input
                 type="text"
                 name="Address"
                 value={Address}
                 //  required
                 onChange={handleChange}
                 placeholder="Address" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
                <input 
                value={clinicName}
                name='clinicName'
                onChange={handleChange} 
                type="text"
                  // required
                placeholder="Clinic Name" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
              </div>
              <br/>
              <div class="grid  md:grid-cols-2 grid-cols-1 gap-5">
                <input  
                name="title"
                  value={title}
                  onChange={handleChange}
                  // required
                  placeholder="Title" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
                <input
                name="speciality"
                value={speciality}
                onChange={handleChange}
                // required
                 type="text" placeholder="Speciality" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
              </div>
              
              <br/>
              <div class="grid  md:grid-cols-2 grid-cols-1 gap-5">
                <input
                 type="password"
                 name="password"
                 id="password"
                 value={formData.password}
                 onChange={handleChange}
                 //  required
                 autoComplete="current-password"
                 placeholder="Password" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
                <input
                name="re_password"
                value={re_password}
                onChange={handleChange}
                // required
                 type="password" placeholder="Confirm Passwod" class="border border-gray-400 pl-3 py-1 pz-2 rounded-lg"/>
              </div>
              <div class="mt-5 pl-3">
                <input checked={check} onClick={(e)=>{
                  if(check)
                  {
                    setCheck(false)
                    return
                  }
                  setCheck(true)
                }} type="checkbox" class="border border-gray-400 pl-3"/>
                <span className='pl-3'>
                  I accept the <a href="#" class="text-[#1F51FFA1]  font-semibold">Terms of Use</a> &  <a href="#" class="text-[#1F51FFA1] font-semibold">Privacy Policy</a> 
                </span>
              </div>
              <div class="mt-5">
                <button class="w-full
                  bg-[#1F51FFA1]
                  rounded-md
                  py-3 text-center text-white"
                  onClick={(e)=>handleSubmit(e)}
                  >
                    {post ? 'Loading...' :'Register Now'}
                  </button>
              </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
    

</>
  );
};

export default Signup;
