import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import { RoomsCollection } from "../db/RoomsCollection";
import MainNavigation from "./MainNavigation";
import RoomList from "./RoomList";

function RoomPage() {
  const rooms = useTracker(() => {
    Meteor.subscribe("rooms");
    return RoomsCollection.find().fetch();
  });
  return (
    <>
      <MainNavigation />
      <div className="roomlists">
        <Link to="/Home"> Go back</Link>
        <h1>Room Lists</h1>
      </div>
      <div>
        {rooms.map((room) => (
          <RoomList key={room._id} room={room} />
        ))}
      </div>
    </>
  );
}

export default RoomPage;
