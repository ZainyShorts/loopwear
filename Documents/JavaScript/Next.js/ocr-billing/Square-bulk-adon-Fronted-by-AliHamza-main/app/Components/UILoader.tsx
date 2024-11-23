import React from 'react';

const UILoader = () => {
  return (
    <div className="flex justify-center h-[100vh] items-center flex-row gap-2">
     <div className='flex flex-col justify-center items-center '>

      <div
        style={{
            backgroundImage: 'conic-gradient(from 0deg, violet, indigo 30%, blue 50%, green 60%, yellow 70%, orange 80%, red 100%)'
        }}
        className="w-14 h-14 rounded-full bg-radial bg-gradient-to-tr animate-spin [animation-delay:.7s]"
        >

      </div>
      <span>Inserting Data into Square...</span>
          </div>
    </div>
  );
}

export default UILoader;
