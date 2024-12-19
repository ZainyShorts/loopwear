


import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';    
import { GlobalStateContext } from '../Context/GlobalStateContext.js'; 
const Pricing = () => {
  const [activePlan, setActivePlan] = useState(1); 
  const {showToast} = useContext(GlobalStateContext);
  const navigate = useNavigate()



  const handleClick = (plan) => {
    setActivePlan(plan);
  };

  const navToPage=(index)=>{
    if(activePlan==index){

      if(index==0)
      {
        navigate("/signup")
      }else{
        showToast('This service is not added yet on the website. Developers are working on it, so please be patient.')
      }
    }else{
      setActivePlan(index)
    }
  }

  const plans = [
    {
      name: 'START',
      price: 'Free',
      features: ['#1 Doctor login', '#1 Front desk login', '#100 Patient Records'],
    },
    {
      name: 'PRO',
      price: '$10/mo',
      features: ['#1 Doctor login', '#1 Front desk login', '#500 Patient Records', 'Additional Perks'],
    },
    {
      name: 'BUSINESS',
      price: '$25/mo',
      features: ['#1 Doctor login', '#1 Front desk login', '#1000 Patient Records', 'Additional Perks'],
    },
    {
      name: 'SPECIAL',
      price: '$50/mo',
      features: ['#1 Doctor login', '#1 Front desk login', 'Unlimited Patient Records', 'Additional Perks'],
    },
  ];

  

  return (
    <>
    <section className="text-gray-600 body-font h-screen bg-gradient-to-t from-[#F2F2F2] dark:from-slate-800 dark:to-slate-900  ">
  <div className=" rounded-lg h-full px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {plans.map((plan, index) => (
        <div key={index} className="p-4 xl:w-1/4 md:w-1/2 w-full">
          <div
            className={`h-full p-6  rounded-lg border-2 flex flex-col relative overflow-hidden ${
              activePlan === index ? 'border-indigo-500' : 'border-gray-300'
            }`}
            onClick={() => handleClick(index)}
            style={{ cursor: 'pointer' }}
          >
            {plan.name === 'PRO' && (
              <span className="bg-indigo-500 text-white dark:text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                POPULAR
              </span>
            )}
            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{plan.name}</h2>
            <h1 className="text-5xl pb-4 mb-4 border-b border-gray-200 text-black dark:text-white leading-none">{plan.price}</h1>
            {plan.features.map((feature, i) => (
              <p key={i} className="flex  items-center text-black dark:text-white mb-2">
                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-black dark:text-white rounded-full flex-shrink-0">
                  <svg
                    
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    className="w-3 h-3 text-indigo-800 "
                    viewBox="0 0 24 24"

                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
                {feature}
              </p>
            ))}
            <button
              onClick={()=>navToPage(index)}
              className={`flex items-center mt-auto text-white py-2 px-4 w-full focus:outline-none rounded ${
                activePlan === index ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-gray-400 hover:bg-gray-500'
              }`}
            >
              Subscribe
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-auto"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <p className="text-xs text-gray-500 mt-3">Your Health, Our Priority.</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
</>


  );

  
};


export default Pricing;
