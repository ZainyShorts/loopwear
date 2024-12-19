/*eslint-disable*/
import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { GlobalStateContext } from '../../Context/GlobalStateContext';
import { useLocation } from 'react-router-dom';

const HomeNavBar = () => {
  const location = useLocation();
const [menuVisible, setMenuVisible] = useState(false);
const {darkMode,setDarkMode,token,navigate} = useContext(GlobalStateContext)

const openBurgerMenu = () => {

  setMenuVisible(true);
};

const closeBurgerMenu = () => {

  setMenuVisible(false);
};







function sleep(number)
{
    return new Promise((resolve,reject)=>{
      setTimeout(resolve,number);
    })
  
}

const handleTransition=async(path)=>{
  setMenuVisible(false)
  const body = document
  .querySelector('body')
  body.classList.add('page-transition')
  await sleep(200)
  navigate(path)
  await sleep(200)
  body.classList.remove('page-transition')
}



  return (
   <>
    <nav class={`w-full   top-0 bg-transparent dark:bg-slate-900 px-6`}>
    <div class="mx-auto py-5 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img  class="w-10" src="/logo.png" alt="" />
      </div>
      <div className="flex items-center justify-center">
        <ul
          class="hidden md:flex space-x-10 text-gray-600 dark:text-gray-100 font-bold text-sm uppercase"
        >
          <li class="hover:text-gray-500 ">
            <span className='cursor-pointer' onClick={()=>handleTransition('/')}>HOME</span>
          </li>
          <li class="hover:text-gray-500 cursor-auto">
            <span className='cursor-pointer' onClick={()=>handleTransition('/About')}>ABOUT</span>
          </li>
          
        {/* <li class="hover:text-gray-500 cursor-auto">
            <span className='cursor-pointer' onClick={()=>handleTransition('/price')}>PRICING</span>
          </li> */}
          <li class="hover:text-gray-500 cursor-auto">
            <span className='cursor-pointer' onClick={()=>handleTransition('/FeedBack')}>FEEDBACK</span>
          </li>
          <li class="hover:text-gray-500 cursor-auto">
            <span className='cursor-pointer' onClick={()=>handleTransition('/registrationmiami')}>Registration</span>
          </li>
          {!token ? <li class="hover:text-gray-500 cursor-auto">
            <span className='cursor-pointer' onClick={()=>handleTransition('/login')}>LOGIN</span>
          </li>:<li class="hover:text-gray-500 cursor-auto">
            <span className='cursor-pointer' onClick={()=>{handleTransition('/TodayPatients')}}>DASHBOARD</span>
          </li>}
          
        </ul>
      </div>
      {!menuVisible ? (
        <div className="relative z-12 max-w-sm lg:hidden xl:hidden md:hidden">
          <RxHamburgerMenu
            onClick={openBurgerMenu}
            className="text-white cursor-pointer"
            size={30}
          />
        </div>
      ) : (
        <div className="relative">
          <ImCross
            onClick={closeBurgerMenu}
            className="text-white absolute -top-3 right-2 z-12 max-w-sm lg:hidden xl:hidden md:hidden cursor-pointer"
            size={30}
          />
        </div>
      )}
      {menuVisible && (
        <ul
          class=" z-10 dark:bg-slate-900 mt-14  absolute left-0 top-0 w-full p-10 rounded-b-3xl space-y-10 text-white text-center"
        >
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/')}>
              HOME
            </span>
          </li>
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/About')}>
              ABOUT
            </span>
          </li>
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/FeedBack')}>
              FEEDBACK
            </span>
          </li>
          <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/registrationmiami')}>
            REGISTRATION
            </span>
          </li>
          {/* <li class="hover:text-gray-500">
            <span onClick={()=>handleTransition('/price')}>
              PRICING
            </span>
          </li> */}
          <li class="hover:text-gray-500">
            <Link to={'/login'}>LOGIN</Link>
          </li>
        </ul>
      )}
    </div>
  </nav>
   </>
  )
}

export default HomeNavBar