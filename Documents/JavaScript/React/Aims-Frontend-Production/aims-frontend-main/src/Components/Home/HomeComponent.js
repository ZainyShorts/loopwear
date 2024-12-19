/*eslint-disable*/
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import {isMobile} from 'react-device-detect';
import HomeNavBar from '../Header/HomeNavBar';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  return (
    <>
        <div
  class={`h-screen bg-gradient-to-t  from-indigo-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden`}
>
  <HomeNavBar/>

  {isMobile ? (
    <img
      class="absolute bottom-0  right-0 lg:left-0 mx-auto h-full"
      src={'/robot.png'}
      alt=""
    />
  ) : (
    <img
      class="absolute bottom-0  right-0 lg:left-0 mx-auto h-full object-cover"
      src={'/robot.png'}
      alt=""
    />
  )}
  <div
    class="hidden lg:block absolute -bottom-1/4 right-0 left-0 mx-auto w-[800px] h-big bg-indigo-900 rounded-full -z-10"
  ></div>
  {!isMobile && (
    <div
      class="absolute top-1/3 left-[30%] text-5xl sm:left-10 sm:text-4xl md:left-1/4 md:text-6xl lg:left-5 xl:left-48 xl:text-7xl font-bold z-[13]"
    >
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-200 md:dark:from-[#4CF8F5] md:dark:to-white dark:from-transparent dark:to-white">
        Aims
      </span>
      <div className="flex flex-col items-center">
        <TypeAnimation
          sequence={[
            'AI for Medical Reporting',
            1000,
            'Streamline Your Consultations',
            1000,
            'AI-Driven Medical Reports',
            1000,
            'Revolutionizing Healthcare with AI',
            1000,
            'Integrating AI to Elevate Medical Excellence',
            1000,
            'Smart Healthcare, Smarter Outcomes',
            1000,
            'AI for Precision and Care',
            1000,
            'Empowering Medical Progress with AI',
          ]}
          wrapper="p"
          speed={50}
          className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-200 md:dark:from-[#4CF8F5] md:dark:to-white dark:from-transparent dark:to-white"
          style={{ fontSize: '0.3em', display: 'inline-block' }}
          repeat={Infinity}
        />
      </div>
    </div>
  )}
      <div
        class="hidden  lg:flex flex-col gap-5 rounded-md shadow-lg absolute top-0 bottom-0 m-auto right-10 bg-white dark:bg-slate-900 dark:shadow-slate-800 p-6 h-fit w-1/3"
      >
        <p class="text-gray-400">
          At AIMS, we are dedicated to revolutionizing the medical field through
          cutting-edge AI technology. By subscribing to our services, you gain
          access to innovative solutions that enhance patient care, streamline
          operations, and drive medical advancements. Join us on this
          transformative journey and be a part of the future of healthcare.
        </p>
        <Link
          class="bg-indigo-600 text-white text-xl px-3 py-2 rounded-md font-semibold w-fit"
          to="/price"
          >Subscribe</Link>
      </div>
    </div>
    </>
  )
}

export default HomeComponent