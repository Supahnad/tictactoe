import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";

function roomCreate() {

    const logout = () => Meteor.logout();

  return (
    <>
      <header>
        <button onClick={logout} className="logout-btn" >
          Log out
        </button>
      </header>
    </>
  );
}

export default roomCreate;
