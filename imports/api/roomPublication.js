import { Meteor } from "meteor/meteor";
import { RoomsCollection } from "../db/RoomsCollection";

Meteor.publish("rooms", function publishRooms() {
  return RoomsCollection.find({ userId: this.userId });
});
