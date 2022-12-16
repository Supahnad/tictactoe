import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function RoomList({ room }) {
  const user = useTracker(() => Meteor.userId());
  let navigate = useNavigate();

  const onClick = () => {
    Meteor.call("insert.player", room._id, (err, res) => {
      if (res === user) {
        navigate(`/TicTacToe/${room._id}`);
      } else if (err) {
        console.log(err);
      }
    });
  };
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
