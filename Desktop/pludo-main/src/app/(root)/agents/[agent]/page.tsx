'use client'
import React from 'react'
import { useParams } from 'next/navigation'; 
import Navbar from '@/app/components/Navbar/Navbar';
import HeroSection from './Components/HeroSection';
import DetailBlocks from './Components/DetailBlocks';
import Footer from '@/app/components/Footer/Footer';
type Params = { 
agent? : string;
}
function Agent() { 
    const params = useParams<Params>();
    const name = params?.agent || 'Unknown Agent'; 
 
    return (
        <div> 
           <Navbar/>  
          <HeroSection Name={name}/>  
          <DetailBlocks Name={name}/> 
          <Footer theme='light'/>
        </div>
    );
}

export default Agent;
