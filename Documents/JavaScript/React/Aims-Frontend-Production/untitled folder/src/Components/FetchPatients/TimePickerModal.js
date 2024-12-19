import React from 'react';
import './TimePickerModal.css';

function TimePickerModal({ setCheckIn,setCheckOut,closeTime , setDate ,HandleTime ,date, checkOut ,checkIN} ) {

 


  const handleSave = () => { 
     HandleTime();
  };

  return (
    <div className="time-picker-container  w-[400px]">
      
        <div className="modal-overlay w-[400px]">
          <div className="modal-content w-[400px]">
            <h2 className='font-bold text-xl text-gray-100'>Select Time</h2>
            <div className="input-group w-[90%]">
              <div className='text-gray-100'>Date:</div>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="input-group w-[90%]">
              <div className='text-gray-100 w-[90%]'>Check-in Time:</div>
              <input
                type="time"
                id="checkInTime"
                value={checkIN} 
                className='w-[90%]'
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="input-group w-[90%]">
              <div className='text-gray-100 w-[90%]'>Check-out Time:</div>
              <input
                type="time"
                id="checkOutTime" 
                className='w-[90%]'
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={closeTime} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>

     
    </div>
  );
}

export default TimePickerModal;

