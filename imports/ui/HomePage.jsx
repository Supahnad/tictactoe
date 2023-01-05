import { Meteor } from "meteor/meteor";
import React, { useState, useEffect } from "react";
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import MainNavigation from "./MainNavigation";
import { RoomsCollection } from "../db/RoomsCollection";
import RoomList from "./RoomList.jsx";

function HomePage(props) {
  const currentUser = useTracker(() => Meteor.user());
  const user = useTracker(() => Meteor.userId());
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [fName, setfName] = useState();
  const [lName, setlName] = useState();
  const [username, setUsername] = useState();
  let navigate = useNavigate();

  const checkForUser = () => {
    if (currentUser) {
      setfName(currentUser.profile.firstName);
      setlName(currentUser.profile.lastName);
      setUsername(currentUser.username);
    } else {
      console.log("not logged in");
    }
  };

  const logout = (e) => {
    e.preventDefault();
    Meteor.logout();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!roomName) return;

    Meteor.call("createRoom", roomName, username, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setRoomId(res);
        navigate(`/TicTacToe/${res}`);
      }
    });
    setRoomName("");
  };

  useEffect(() => {
    checkForUser();
  });

  return (
    <div>
      <MainNavigation />
      {
        <div className="nameOfUser">
          <h3>
            Welcome {fName} {lName} !
          </h3>
        </div>
      }
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
        <Link className="roomlist-btn" to="/RoomLists">
          Room lists
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
