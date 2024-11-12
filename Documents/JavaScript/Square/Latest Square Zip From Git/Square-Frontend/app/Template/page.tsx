"use client";
import React from 'react';
import { useAuth } from '../Context/authcontext'; 
import { useRouter } from 'next/navigation'; 

const Page: React.FC = () => {
  const { selectedOption, setSelectedOption , setTitles , setTempName } = useAuth();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  }; 
 const router = useRouter();
  const navigateUpload = () =>{ 
    let titleList = []
    if(selectedOption == 'U.B.C DISTRIBUTERS')
    {
      setTempName('UBC')
      titleList = ['#','Product','UPC','Description','Qty','Unit Price','PPU','Amount']
    }else if(selectedOption== 'PRESTIGE HOUSEWARES')
    {
      setTempName('PRESTIGE')
      titleList = ['SKU','Description','Qty Ordered','Rate','Amount']
    }
    else if(selectedOption == 'SOURIANA IMPORTS INC')
    {
      setTempName('SOURIANA')
      titleList = ['Quantity','Item Code','Description','Unit Price','Amount']
    }
    else if(selectedOption == 'HABASH TRADING INC')
    {
      setTempName('HABASH')
      titleList = ['Quantity','Item','Description','Unit Price','Amount']
    }else{
      setTempName('HABASH')
      return
    }
    setTitles(titleList)
    router.push('/upload')
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
        <div className="w-[90vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] px-4 py-5 bg-white flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
          <h1 className="text-xl font-semibold mb-3 select-none">Choose One</h1>

          {["U.B.C DISTRIBUTERS", "PRESTIGE HOUSEWARES", "SOURIANA IMPORTS INC", "HABASH TRADING INC"].map((item, index) => (
            <label
              key={index}
              className={`font-medium h-14 relative flex items-center justify-between px-3 rounded-lg 
              border border-transparent transition-colors duration-200 
              ${selectedOption === item ? 'bg-blue-600 text-white' : 'hover:bg-zinc-100'}
              `}
            >
              <span>{item}</span>
              <span className="flex items-center justify-center w-4 h-4 border-2 rounded-full border-blue-600 
                transition-all duration-200 ease-in-out peer-checked:bg-blue-600 peer-checked:border-transparent">
                {selectedOption === item && (
                  <span className="block w-2 h-2 bg-white rounded-full" />
                )}
              </span>
              <input
                type="radio"
                name="status"
                value={item}
                onChange={handleOptionChange}
                className="peer w-4 h-4 accent-blue-600 hidden"
              />
            </label>
          ))}
        </div>

        {selectedOption && (
          <button type="button" onClick={navigateUpload} className="mt-4 subscribe-button">
            <p>Go Ahead</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        .subscribe-button {
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
          --primary-color: #111;
          --hovered-color: #c84747;
          position: relative;
          display: flex;
          font-weight: 600;
          font-size: 20px;
          gap: 0.5rem;
          align-items: center;
        }

        .subscribe-button p {
          margin: 0;
          position: relative;
          font-size: 20px;
          color: var(--primary-color); /* Ensure the text color is the primary color */
          transition: color 0.3s ease; /* Add transition for smooth color change */
        }

        .subscribe-button::after {
          position: absolute;
          content: "";
          width: 0;
          left: 0;
          bottom: -7px;
          background: var(--hovered-color);
          height: 2px;
          transition: 0.3s ease-out;
        }

        .subscribe-button:hover p {
          color: var(--hovered-color); /* Change text color on hover */
        }

        .subscribe-button:hover::after {
          width: 100%;
        }

        .subscribe-button:hover svg {
          transform: translateX(4px);
          color: var(--hovered-color);
        }

        .subscribe-button svg {
          color: var(--primary-color);
          transition: 0.2s;
          position: relative;
          width: 15px;
          transition-delay: 0.2s;
        }
      `}</style>
    </>
  );
};

export default Page;
