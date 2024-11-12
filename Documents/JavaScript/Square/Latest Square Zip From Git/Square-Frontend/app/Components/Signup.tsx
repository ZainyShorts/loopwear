"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for the latest Next.js versions
import { setCookie } from 'cookies-next';
import axios from 'axios';
import ModalError from './ModalError';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const signupHandler = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/createUser`, {
        name,
        email,
        password,
      });

      if (response.data.success === false) {
        setMsg(response.data.error);
        setShowModal(true);
        return
    }
    setMsg(response.data.message || 'Something went wrong.');
    setShowModal(true);
    setTimeout(()=>{
        router.push('/'); // Redirect to dashboard or desired page after signup
    },2000)
} catch (err:any) {
      setError(err.response?.data?.message || 'Something went wrong.');
      setMsg(err.response?.data?.message || 'Something went wrong.');
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && <ModalError msg={msg} setShowModal={setShowModal} />}
      <div className="w-[50vw] md:w-[30vw] relative flex flex-col p-4 rounded-md text-black bg-gray-200">
        <div className="text-2xl font-bold mb-2 text-[hsl(256,69%,17%)] text-center">
          Square <span className="text-[#7747ff]">Inventory</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Create Account
        </div>
        <div className="flex flex-col gap-3">
          <div className="block relative">
            <label
              htmlFor="Name"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
          </div>
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
            type="button" // Change to button since form submission is manual
            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            onClick={signupHandler}
          >
            Signup
          </button>
          <div onClick={()=>router.push('/')} className="text-md cursor-pointer  underline text-[#7747ff] mb-4 text-center font-bold">
       Signin
      </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
