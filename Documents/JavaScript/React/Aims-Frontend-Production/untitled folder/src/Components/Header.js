import React from 'react';
import {ReactTyped} from 'react-typed';
import './Header.css'; // Import CSS file for Header styling

const Header = () => {
  return (
    <div className="header-container">
       
      <img
        src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="background-image"
        alt=""
      />
      
      <div className="overlay">
      <svg id="svg" classname="svg-shape" viewBox="0 0 1160 163"  version="1.1"  transform="matrix(-1,0,0,-1,0,0)">
            <path fill="rgba(109, 190, 201, 0.8)" d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"></path>
        </svg>
        <svg
            className="svg-shape"
            viewBox="0 0 1160 163"
          >
            <path
              fill="rgba(109, 190, 201, 0.8)" // Bluish color that matches the Nav bar palette
              d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className='text-white max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
          <p className='text-[#4CAF50] text-lg font-bold p-2' style={{  opacity: 0.8 }}> {/* Green color from Nav */}
            Innovative Tools for Doctors, Better Healthcare for Patients
          </p>
          <h1 className='md:text-6xl sm:text-6xl text-3xl font-bold md:py-6 text-[#FEFEE2cc]' style={{  opacity: 0.9 }}>
            Your All-in-One Solution
          </h1>
          <div className='flex justify-center items-center'>
            <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4 text-[#FEFEE2cc]' style={{  opacity: 0.9 }}>
              For Generating
            </p>
            <ReactTyped
              className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-[#FEFEE2cc]'
              strings={['SOAP Notes', 'Medical Codes', 'Report']}
              typeSpeed={120}
              backSpeed={140}
              loop
              style={{  opacity: 0.9 }}
            />
          </div>
          <p className='md:text-2xl text-xl font-bold text-[#4CAF50]' style={{  opacity: 0.8 }}> {/* Green color from Nav */}
            Innovative Tools for Doctors, Better Healthcare for Patients.
          </p>
          <button className='bg-[#4CAF50] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' style={{  opacity: 0.8 }}> {/* Green color from Nav */}
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
