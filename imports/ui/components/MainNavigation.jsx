import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import Modal from "./Modal";

function roomCreate({ onConfirm }) {
  // const [response, setResponse] = useState();

  // const logout = () => {
  //   setResponse("successfully Logged Out!")
  //   // Meteor.logout();
  // } 


  return (
    <>
      <div className="Mainheader">
        <header className="header-container">
          <Link className="Logo" to="/Home">
            Tic Tac Toe
          </Link>
          <button onClick={onConfirm} className="logout-btn">
            <span>Log out</span>
          </button>
        </header>
      </div>
    </>
  );
}

export default roomCreate;
