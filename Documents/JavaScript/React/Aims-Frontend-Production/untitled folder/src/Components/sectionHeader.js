import React from 'react'

import Laptop from '../images/omm.png';

const section = () => {
  return (
    <div className='w-full bg-[#FEFEE2cc] py-5 px-20 flex  sm:py-20 '>
      <div data-aos="fade-up"
     data-aos-duration="1500" className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className=' w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div data-aos="fade-zoom-in"  className='flex flex-col justify-center'>
          <p className='text-[#4CAF50] text-5xl font-bold ' style={{  opacity: 0.8 }}>About US</p>
          <p className='py-5 md:text-lg sm:text-lg text-lg' style={{  opacity: 0.8 }}>
          In the SCRIBER team, our mission is to empower doctors with the tools they need to effortlessly create SOAP notes and generate accurate medical codes. We are dedicated to ensuring streamlined consultations and elevating 
          the standard of patient care through innovative healthcare documentation solutions.
          </p>
          <button className='bg-[#4CAF50] text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default section;