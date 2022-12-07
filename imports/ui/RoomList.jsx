import { Meteor } from "meteor/meteor";
import React from "react";
import MainNavigation from "./MainNavigation";

function RoomList({ room }) {
  const onClick = () => {
      Meteor.call('insert.player2', room._id);
  }
  return (
    <>
      <button className="roomNames" onClick={onClick}>
        <p>Room Name</p>
        <p>{room.name}</p>
      </button>
    </>
  );
}

export default RoomList;
