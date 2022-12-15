import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "../db/RoomsCollection";

Meteor.publish("rooms", function publishRooms() {
  return RoomsCollection.find({ userId: this.userId });
});

Meteor.publish("roomData", function findPlayer(playerId) {
  return RoomsCollection.find({ player1Id: playerId });
});
// Meteor.publish("roomDataAll", function roomCreate(roomId) {
//   return RoomsCollection.find({ _id: roomId });
// });
