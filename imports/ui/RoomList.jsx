import { Meteor } from "meteor/meteor";
import React from "react";
import MainNavigation from "./MainNavigation";

function RoomList({ room }) {
  return (
    <>
      <button className="roomNames">
        <p>Room Name</p>
        <p>{room.name}</p>
      </button>
    </>
  );
}

export default RoomList;
