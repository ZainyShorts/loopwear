"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for the latest Next.js versions
import { setCookie } from 'cookies-next';
import axios from 'axios';
import ModalError from './ModalError'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showmodal,setShowModal] = useState(false)
  const [msg,setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{

   
   const res = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL}checkKeys/`)
   if(res.data.success == false)
   {
    setMsg(res.data.error)
    setShowModal(true)
    return
   }
   const data = {
    email,
    password
   }
   const result = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}loginUser`,data)

   if(result.data.success==false)
   {
    setMsg(result.data.error)
    setError(result.data.error);
    setShowModal(true)
    return
   }else{
    setCookie('authToken', true, { maxAge: 60 * 60 * 24 }) 
      router.push('/Template');
   }
  }catch(e){
    setMsg('Run Backend Server')
    setShowModal(true)
  }

  };

  return (
    <>
    {
      showmodal && (
        <ModalError msg={msg} setShowModal={setShowModal}/>
      )
    }
    <div className=" w-[50vw] md:w-[30vw]  relative flex flex-col p-4 rounded-md text-black bg-gray-200">
      <div className="text-2xl font-bold mb-2 text-[hsl(256,69%,17%)] text-center">
        Square <span className="text-[#7747ff]">Iventory</span>
      </div>
      <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
        Log in to your account
      </div>
      <div  className="flex flex-col gap-3">
        <div className="block relative">
          <label
            htmlFor="email"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        <div className="block relative">
          <label
            htmlFor="password"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit" 
          onClick={handleSubmit}
          className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
        >
          Submit
        </button>
        <div onClick={()=>router.push('/signup')} className="text-md cursor-pointer  underline text-[#7747ff] mb-4 text-center font-bold">
       Signup
      </div>
     </div>
    </div>
    </>
  );
};

export default Login;
