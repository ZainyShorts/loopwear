'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AgentDetails from './components/HeroSection';
import SubRoles from './components/subRoles';

type Params = { 
  agent?: string;
};

const Page = () => {
  const params = useParams<Params>();
  const [agent, setAgent] = useState<string>('Not Defined');

  useEffect(() => {
    setAgent(params?.agent || 'Not Defined');
  }, [params]);

  return (
    <div>
      <AgentDetails name={agent} /> 
      <SubRoles name={agent}/>
    </div>
  );
};

export default Page;
