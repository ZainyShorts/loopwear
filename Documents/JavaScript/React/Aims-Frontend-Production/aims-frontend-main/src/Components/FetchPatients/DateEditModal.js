/*eslint-disable*/
import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateEditModal = ({title,state,setState,editFunction,closeModalfn,type,state2,setState2}) => {
  return (
    <>
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900 bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white dark:bg-slate-900 w-96 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl text-white text-center font-bold mb-4">Edit {title}</h2>

      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">Date</label>
      <DatePicker
        className="block w-full p-2 bg-white border dark:bg-slate-800 text-white border-gray-300 rounded-md"
        selected={state}
        onChange={(date) => setState(date)}
        placeholder={'YYYY-MM-DD'}
        showTimeSelect
        dateFormat="yyyy/MM/dd"
      />

      {
        type == 'Document' &&

        <div>
                    <br/>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 ">File Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={state2}
                      onChange={(e)=>setState2(e.target.value)}
                      placeholder='Set File Name'
                      className="mt-1 block w-full p-2 border bg-slate-900  border-gray-300 rounded-md shadow-sm "
                    />
                  </div>
      }

      <div className="flex justify-end mt-4">
        <button
        
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={editFunction}
        >
          Save
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={closeModalfn}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
    </>
  )
}

export default DateEditModal