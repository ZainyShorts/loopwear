/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const HelpComponent = () => {
  const [openBox, setOpenBox] = useState(null);
  const navigate = useNavigate();
  const { checker, setUser } = useContext(GlobalStateContext);
  const dispatch = useDispatch();

  const getAnimation = (box) => useSpring({
    height: openBox === box ? '200px' : '0px', 
    opacity: openBox === box ? 1 : 0,
    overflow: 'hidden', 
    minHeight: openBox === box ? '0px' : '1px',
  });

  const toggleBox = (box) => {
    setOpenBox(openBox === box ? null : box);
  };

  useEffect(() => {
    checker().then((res) => {
      if (res === false) {
        setUser(false);
        dispatch(logout());
        navigate('/');
      }
    });
  }, [checker, setUser, dispatch, navigate]);

  return (
    <div className="p-8 top-[3cm] mx-auto h-[100vh]  bg-white  shadow-lg dark:bg-slate-900">
      <h1 className="text-3xl font-bold text:gray-800 dark: text-white mb-6">Help</h1>
      <div className="flex flex-col gap-6  items-center">
        <div>
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center justify-between cursor-pointer" onClick={() => toggleBox('faq1')}>
              Frequently Asked Questions (FAQs) 1
              <span className="ml-2">{openBox === 'faq1' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180 transition duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}</span>
            </h2>
            <animated.div style={getAnimation('faq1')}>
              <ul className="list-disc pl-6">
                <li className="text-gray-700 mb-2 dark:text-white ">How do I reset my password?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">How can I contact customer support?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">Where can I find my account settings?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">What are the system requirements?</li>
              </ul>
            </animated.div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between cursor-pointer dark:text-white " onClick={() => toggleBox('contact')}>
              Contact Us
              <span className="ml-2">{openBox === 'contact' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180 transition duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}</span>
            </h2>
            <animated.div style={getAnimation('contact')}>
              <div>
                <p className="text-gray-700 mb-2 dark:text-white ">If you have any further questions or need assistance, please feel free to contact our customer support team:</p>
                <p className="text-gray-700 mb-2 dark:text-white ">Email: jasmel@aimedicalscriber.com</p>
                <p className="text-gray-700 mb-2 dark:text-white ">Email: jasmelacosta@gmail.com</p>
                <p className="text-gray-700 mb-2 dark:text-white ">Phone: 7866432099</p>
              </div>
            </animated.div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between cursor-pointer dark:text-white "
            //  onClick={() => toggleBox('faq2')}
             >
              Tutorial Guide
              <span className="ml-2">{openBox === 'faq2' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180 transition duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition duration-300 ease-in-out" fill="none" viewBox="0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}</span>
            </h2>
            <animated.div style={getAnimation('faq2')}>
              <ul className="list-disc pl-6">
                <li className="text-gray-700 mb-2 dark:text-white ">How do I reset my password?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">How can I contact customer support?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">Where can I find my account settings?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">What are the system requirements?</li>
              </ul>
            </animated.div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-between cursor-pointer dark:text-white " 
            // onClick={() => toggleBox('faq3')}
            >
              Youtube Demo
              <span className="ml-2">{openBox === 'faq3' ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-180 transition duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition duration-300 ease-in-out" fill="none" viewBox="0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}</span>
            </h2>
            <animated.div style={getAnimation('faq3')}>
              <ul className="list-disc pl-6">
                <li className="text-gray-700 mb-2 dark:text-white ">How do I reset my password?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">How can I contact customer support?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">Where can I find my account settings?</li>
                <li className="text-gray-700 mb-2 dark:text-white ">What are the system requirements?</li>
              </ul>
            </animated.div>
          </div>
        </div>
        <iframe
  class="w-[90vw] md:w-[50vw] lg:w-[45vw] xl:w-[40vw]"
  height="300"
  src="https://www.youtube-nocookie.com/embed/HoHt4dS1V5U?si=aEKOGW9QeiwbLru6"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

      </div>
    </div>
  );
};

export default HelpComponent;
