import React from 'react'
import { AiTwotoneAudio } from "react-icons/ai";
const AudioModal = ({Approve , Reject}) => { 
    const Approval = () => {
        Approve(); 
    } 
    const Rejection = () => { 
        Reject();
    }
  return (
    <div class="w-96 bg-gray-100 rounded-md shadow-md m-5">
  <div class="flex items-center">
    <div class="w-1/5">
      <div class="bg-blue-500 w-12 h-12 rounded-full text-center p-4 mx-auto">
      <AiTwotoneAudio size={18} />
      </div>
    </div>

    <div class="w-4/5">
      <div class="flex items-baseline w-full">
        <span class="flex-grow text-lg font-semibold text-gray-800 py-5 pl-2">Start the Audio</span>
        <span class="w-1/5 text-right pr-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="15"
            width="15"
            viewBox="0 0 384 512" 
            onClick={Rejection}
            class="cursor-pointer fill-current text-gray-400 hover:text-gray-600 transition duration-300"
          >
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            ></path>
          </svg>
        </span>
      </div>
      <div class="text-sm text-gray-600 py-2 pl-2">
        The maximum Audio Recording time is 60 second.
      </div>
      <button type="button" onClick={Approval} class="text-sm font-semibold py-1 px-3 mt-2 mb-5 rounded-full text-blue-500 border border-blue-200 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-200 transition duration-300">
        Start
      </button>
    </div>
  </div>
</div>
  ) 
}

export default AudioModal
