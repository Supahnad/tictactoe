import { Meteor } from "meteor/meteor";
import React from "react";
import { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function RoomList({ room }) {
  const user = useTracker(() => Meteor.userId());
  const [isCreator, setIsCreator] = useState(false);
  let navigate = useNavigate();

  const checkIfRoomCreator = () => {
    if (room.player1Id === user) {
      setIsCreator(true)
    }
  };

  const onClick = () => {
    Meteor.call("insert.player", room._id, (err, res) => {
      if (res.status === "success") {
        navigate(`/TicTacToe/${room._id}`);
      } else {
        alert(res.message);
      }
    });
  };

  const onDelete = () => {
    Meteor.call("deleteRoom", room._id);
  };

  useEffect(() => {
    checkIfRoomCreator();
  }, []);

  return (
    <>
      <div className="rooms">
        <div className="roomNames" onClick={onClick}>
          <p>Room Name</p>
          <p>{room.name}</p>
        </div>
        {isCreator && (
          <button className="remove-room" onClick={onDelete}>
            &times;
          </button>
        )}
      </div>
    </>
  );
}

export default RoomList;
