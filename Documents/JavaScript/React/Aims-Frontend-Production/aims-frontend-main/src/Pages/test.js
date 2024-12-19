import React from 'react'

const test = () => {
  return ( 

        <div className="dark:bg-slate-900 min-h-screen w-[200px] flex ">
          <div className=" bg-blue-gray-800 p-8 w-[200px] rounded-lg shadow-lg text-slate-100">
            <h1 className="text-2xl font-semibold text-center mb-6">Medical Report</h1>
    
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Patient Information</h2>
              <div className="grid grid-cols-2 gap-4 text-slate-100">
                <p><span className="font-semibold">Name:</span> John Doe</p>
                <p><span className="font-semibold">Age:</span> 35</p>
                <p><span className="font-semibold">Gender:</span> Male</p>
                <p><span className="font-semibold">Date:</span> 15th November, 2024</p>
              </div>
            </section>
    
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-100">Subjective</h2>
              <p className="mt-2 text-slate-300">Patient reports chronic headaches and dizziness occurring over the last two weeks, with episodes of nausea.</p>
            </section>
    
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-100">Objective</h2>
              <p className="mt-2 text-slate-300">Vital signs are within normal limits. Mild tenderness in the cervical spine area, no neurological deficits observed.</p>
            </section>
    
            <section className="mb-8">
              <h2 className="text-xl font-bold text-slate-100">Plan</h2>
              <p className="mt-2 text-slate-300">Initiate physical therapy, prescribe pain relief medication, and schedule follow-up in two weeks.</p>
            </section>
          </div>
        </div>
      );
    }
    


export default test