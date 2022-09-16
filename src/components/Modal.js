import React from "react";
import "./Modal.css";

function Modal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Lets Play Snake!</h1>
        </div>
        <div className="body">
          <p>Press W A S D on the keyboard to move</p>
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
