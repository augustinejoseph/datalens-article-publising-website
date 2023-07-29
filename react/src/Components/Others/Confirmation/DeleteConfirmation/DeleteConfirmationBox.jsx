import React from "react";
import "./DeleteConfirmationBox.css";

const DeleteConfirmationBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-box-modal">
      <div className="confirmation-box-content">
        <p>{message}</p>
        <div className="confirmation-box-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationBox;
