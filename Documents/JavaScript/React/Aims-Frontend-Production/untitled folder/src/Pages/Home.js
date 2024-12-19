
// import React from 'react'
// import Nav  from '../Components/Nav.js'
// import Hero from '../Components/Role.js'
// import Footer from '../Components/Footer.js'
// import Header from'../Components/Header.js'
// import Section from '../Components/sectionHeader.js'
// import Sectio from '../Components/section2.js'

// const Home = () => {

//   return (
//     <div className='flex-col '>
//         <div className='bg-[#FEFEE2cc]'><Nav/></div>
//         <Hero/>
//         <div><Footer /></div>
//         </div>
//   )
// }

//  export default Home



/*eslint-disable*/
import React, { useContext } from 'react'
import './test.css'
import { GlobalStateContext } from '../Context/GlobalStateContext';
import About from '../Components/About/About';
import Services from '../Components/Services/Services.js';
import FeedBack from '../Components/FeedBack/FeedBack.js';
import Footer from '../Components/Footer/Footer.js'
import HomeComponent from '../Components/Home/HomeComponent.js';
import TryNowDemo from '../Components/Home/TryNow.js';
import HomeNavBar from '../Components/Header/HomeNavBar.js';

const Home = () => {

const {darkMode} = useContext(GlobalStateContext)





  return (
   <>
<section className={`${darkMode ? '' : 'dark'}`}>
    <HomeNavBar/>
    {/* <HomeComponent/> */}
    <TryNowDemo/>
    <Footer/>
    </section>
   </>
  )
}

export default Home

