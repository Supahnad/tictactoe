import React from "react";

function Modal({ response, onClose, onConfirm }) {
  return (
    <div>
      <div className="backdrop" onClick={onClose}>
        <div
          className="card"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <header></header>
          <p>{response}</p>
          <footer>
            <button onClick={onConfirm}>Okay</button>
            <button onClick={onClose}>Close</button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Modal;
