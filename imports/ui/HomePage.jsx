import { Meteor } from "meteor/meteor";
import React, { useState, useEffect } from "react";
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import MainNavigation from "./MainNavigation";
import { RoomsCollection } from "../db/RoomsCollection";
import RoomList from "./RoomList.jsx";

function HomePage(props) {
  const user = useTracker(() => Meteor.userId());
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  let navigate = useNavigate();


  const logout = (e) => {
    e.preventDefault();
    Meteor.logout();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!roomName) return;

    Meteor.call("createRoom", roomName, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setRoomId(res);
        Meteor.subscribe("roomData", roomId);
        navigate(`/TicTacToe/${res}`);
      }
    });
    setRoomName("");
  };

  return (
    <div>
      <MainNavigation />
      {/* {roomId && <Navigate to={`/TicTacToe/${roomId}`} replace={true} />} */}
      {!user && <Navigate to="/" replace={true} />}
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

        <button type="submit">
          <Link className="login-btn" to="/RoomLists">
            Room lists
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
