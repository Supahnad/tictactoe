import { Meteor } from "meteor/meteor";
import React from "react";
import { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function RoomList({ room }) {
  const player2 = useTracker(() => Meteor.user());
  const user = useTracker(() => Meteor.userId());
  const [username, setUsername] = useState();
  const [isCreator, setIsCreator] = useState(false);
  let navigate = useNavigate();

  const checkForUsers = () => {
    if (room.player1Id === user) {
      setIsCreator(true);
    }
  };

  const onClick = () => {
    Meteor.call("insert.player", room._id, player2.username, (err, res) => {
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
    checkForUsers();
  }, []);

  return (
    <>
      <div className="rooms">
        <div className="roomNames" onClick={onClick}>
          <p>Room Name: {room.name}</p>
          <p>Room Creator: {room.player1Username}</p>
          <p>{room.player2Id === null ? <span>looking for opponent</span> : <span>Room is Full</span>}</p>
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
