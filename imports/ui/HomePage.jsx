import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import MainNavigation from "./MainNavigation";
import { RoomsCollection } from "../db/RoomsCollection";
import RoomList from "./RoomList.jsx";

function HomePage() {
  const user = useTracker(() => Meteor.userId());
  const [roomName, setRoomName] = useState("");


  const logout = (e) => {
    e.preventDefault();
    Meteor.logout();
  };

  const submitHandler = () => {
    event.preventDefault();
    if (!roomName) return;

    Meteor.call("createRoom", roomName);

    setRoomName("");
  };

  return (
    <div>
      <MainNavigation />
      {!user && <Navigate to="/LogIn" replace={true} />}
      <div className="room-container">
        <form className="room-form" onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              placeholder="Enter a room name"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
              required
            />
            <button type="submit">Create room</button>
          </div>
        </form>

        <button type="submit"><Link className="login-btn"  to="/RoomLists">Room lists</Link></button>
      </div>
    </div>
  );
}

export default HomePage;
