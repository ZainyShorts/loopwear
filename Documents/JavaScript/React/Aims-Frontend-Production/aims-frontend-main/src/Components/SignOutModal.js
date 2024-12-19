import React from 'react';

const SignOutModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white p-6 z-50 block">
            <p className="mb-4">Are you sure you want to sign out?</p>
            <div className="flex justify-end">
              <button className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={onCancel}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={onConfirm}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignOutModal;
