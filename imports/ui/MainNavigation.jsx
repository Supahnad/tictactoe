import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

function roomCreate() {
  const logout = () => Meteor.logout();

  return (
    <>
      <div className="Mainheader">
        <header className="header-container">
          <Link className="Logo" to="/Home">
            Tic Tac Toe
          </Link>
          <button onClick={logout} className="logout-btn">
            <span>Log out</span>
          </button>
        </header>
      </div>
    </>
  );
}

export default roomCreate;
