import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "../db/RoomsCollection";

Meteor.publish("rooms.getRooms", function publishRooms() {
  return RoomsCollection.find();
});

Meteor.publish("rooms.getRoom", function findPlayer(roomId) {
  return RoomsCollection.find({ _id: roomId });
});
