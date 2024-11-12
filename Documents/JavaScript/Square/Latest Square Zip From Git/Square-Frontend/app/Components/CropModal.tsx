import React from 'react';

interface CropModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
  croppedImage?: string | null; // Optional, in case no image is available
}

const CropModal: React.FC<CropModalProps> = ({ isOpen, onAccept, onReject, onClose, croppedImage }) => {
  if (!isOpen) return null;

  const handleAccept = () => {
    onAccept();
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="cookies-card">
        <p className="cookie-heading">Confirm Crop</p>
        <p className="cookie-para">Are you sure you want to crop this image?</p>
        {croppedImage && (
          <img src={croppedImage} alt="Cropped Preview" className="cropped-preview" />
        )}
        <div className="button-wrapper">
          <button className="accept cookie-button" onClick={handleAccept}>Yes</button>
          <button className="reject cookie-button" onClick={handleReject}>No</button>
        </div>
        <button className="exit-button" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 162 162"
            className="svgIconCross"
          >
            <path strokeLinecap="round" strokeWidth="17" stroke="black" d="M9.01074 8.98926L153.021 153"></path>
            <path strokeLinecap="round" strokeWidth="17" stroke="black" d="M9.01074 153L153.021 8.98926"></path>
          </svg>
        </button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000; /* Ensure modal is above other content */
        }

        .cookies-card {
          width: 280px;
          background-color: rgb(255, 250, 250);
          border-radius: 10px;
          border: 1px solid rgb(206, 206, 206);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px;
          gap: 15px;
          font-family: Arial, Helvetica, sans-serif;
          box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.066);
        }

        .cookie-heading {
          color: rgb(34, 34, 34);
          font-weight: 800;
        }

        .cookie-para {
          font-size: 11px;
          font-weight: 400;
          color: rgb(51, 51, 51);
        }

        .cropped-preview {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
          margin-top: 10px;
        }

        .button-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .cookie-button {
          width: 50%;
          padding: 8px 0;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .accept {
          background-color: rgb(34, 34, 34);
          color: white;
        }

        .reject {
          background-color: #ececec;
          color: rgb(34, 34, 34);
        }

        .accept:hover {
          background-color: rgb(0, 0, 0);
        }

        .reject:hover {
          background-color: #ddd;
        }

        .exit-button {
          position: absolute;
          top: 17px;
          right: 17px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .exit-button:hover {
          background-color: #ddd;
          color: white;
        }

        .svgIconCross {
          height: 10px;
        }
      `}</style>
    </div>
  );
};

export default CropModal;
