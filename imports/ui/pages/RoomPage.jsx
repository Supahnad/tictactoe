import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link, Navigate } from "react-router-dom";
import { RoomsCollection } from "../../db/RoomsCollection";
import MainNavigation from "../components/MainNavigation";
import RoomList from "../components/RoomList";
import Modal from "../components/Modal";

function RoomPage() {
  const user = useTracker(() => Meteor.userId());
  const [response, setResponse] = useState();
  const rooms = useTracker(() => {
    Meteor.subscribe("rooms.getRooms");
    return RoomsCollection.find().fetch();
  });

  const logout = (e) => {
    e.preventDefault();
    Meteor.logout();
    setResponse(null);
  };

  const closeModal = () => {
    setResponse(null);
  };
  const openModal = () => {
    setResponse("Are you sure you want to log out?");
  }

  return (
    <>
      <MainNavigation onConfirm={openModal} />
      {response && <Modal response={response} onClose={closeModal} onConfirm={logout} />}
      {!user && !response && <Navigate to="/" replace={true} />}
      <div className="roomlists">
        <Link to="/Home"> &larr; Go back</Link>
        <h1>Room Lists</h1>
      </div>
      <div className="roomlist-wrapper">
        {rooms.map((room) => (
          <RoomList key={room._id} room={room} />
        ))}
      </div>
    </>
  );
}

export default RoomPage;
