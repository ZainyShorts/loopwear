import React, { useContext } from 'react'
import logo from '../images/logo.png'
import './Nav.css'; // Import CSS file
import { GlobalStateContext } from '../Context/GlobalStateContext';
import { Link } from 'react-router-dom';
const Nav = () => {
  const { user } = useContext(GlobalStateContext)
  return (
    <nav className=" c">
      
      <div className="nav-logo-container">
        <img src={logo} alt="Logo" className=" !w-12 !h-12 nav-logo cursor-pointer" />
      </div>
      <div className="nav-menu ">
        <Link to="/" className="nav-menu-item cursor-pointer">Home</Link>
        <Link to="/About" className="nav-menu-item cursor-pointer">About</Link>
        <Link to="/price" className="nav-menu-item cursor-pointer">Pricing</Link>
        <Link  to="/Feedback" className="nav-menu-item cursor-pointer">FeedBack</Link>
        <Link  to="/registrationmiami" className="nav-menu-item cursor-pointer">Registration</Link>
      </div>
     {!user && <Link to="/login"><button className="nav-button">Login</button></Link>}
     {user && <Link to="/TodayPatients"><button className="nav-button">Dashboard</button></Link>}
      
      
    </nav>
  );
};

export default Nav;