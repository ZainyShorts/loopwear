import React from 'react'
import MarketingSection from '../../../../components/MarketingCard/MarketingCard'; 
import { marketingDataRobots } from '../../../../components/MarketingCard/marketingDataRobots';
function Robots() { 
   
  return (  
    <>
    {marketingDataRobots.map((data, index) => (
        <MarketingSection 
          key={index}  
          mainCard={data.mainCard}
          subCard1={data.subCard1} 
          subCard2={data.subCard2}
        />
      ))}
     </>
  )
}

export default Robots
