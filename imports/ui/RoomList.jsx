import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function RoomList({ room }) {
  const user = useTracker(() => Meteor.userId());
  let navigate = useNavigate();

  const onClick = () => {
    Meteor.call("insert.player.v2", room._id, (err, res) => {
      if (res.status === 'success') {
        navigate(`/TicTacToe/${room._id}`);
      } else {
        alert(res.message);
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
