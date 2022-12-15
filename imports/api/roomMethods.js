import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { RoomsCollection } from "../db/RoomsCollection";

Meteor.methods({
  "createRoom"(name) {
    check(name, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const roomId = RoomsCollection.insert({
      name,
      createdAt: new Date(),
      player1Id: this.userId,
      player2Id: null,
      status: "waiting",
    });

    return roomId;
  },

  "insert.player2"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    // const player1 = RoomsCollection.find(
    //   { _id: roomId },
    //   { fields: { player1Id: 1 } }
    // );

    // if (this.userId === player1) {
    //   throw new Meteor.Error("This is your Created Room");
    // }

    RoomsCollection.update(
      { _id: roomId },
      { $set: { player2Id: this.userId } }
    );
  },

  // "getPlayer1"(player2Id) {
  //   check(player2Id, String);

  //   if (!this.userId) {
  //     throw new Meteor.Error("Not authorized.");
  //   }

  //   const player2 = RoomsCollection.findOne({ player2Id });

  //   if(player2 === null)
  //   throw new Meteor.Error("Waiting for opponent.");
  // },
});
