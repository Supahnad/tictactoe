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
      squares: new Array(9).fill(null),
      xScore: 0,
      oScore: 0,
    });

    return roomId;
  },

  "insert.player"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const room = RoomsCollection.findOne({ _id: roomId });

    if (room.player1Id === this.userId) {
      return room.player1Id;
    }
    if (room.player2Id === this.userId) {
      return room.player2Id;
    }
    if (room.player2Id === null) {
      RoomsCollection.update(
        { _id: roomId },
        { $set: { player2Id: this.userId } }
      );
      return room.player2Id;
    }
    if (room.player1Id !== null && room.player2Id !== null) {
      if (room.player1Id !== this.userId || room.player2Id !== this.userId) {
        throw new Meteor.Error("Room Is Full.");
      }
    }
  },

  "insert.player.v2"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      return {
        status: 'error',
        message: 'User not logged in',
      }
    } else {
      const room = RoomsCollection.findOne({ _id: roomId });
      const {player1Id, player2Id} = room;
      const isRoomCreator = player1Id === this.userId;
      const isChallenger = player2Id === this.userId;
      const isNotChallenger = player2Id !== this.userId;
      if (isRoomCreator || isChallenger) { // If user is already player 1 or player 2
        return {
          status: 'success',
        }
      } else  {
        if (!player2Id) { // Join room if no player 2 yet
          RoomsCollection.update(
              { _id: roomId },
              { $set: { player2Id: this.userId } }
          );
          return {
            status: 'success',
          }
        }
        if (isNotChallenger) {
          return {
            status: 'error',
            message: 'Room is full',
          }
        }
      }
    }
  },

  "player1Leave"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    RoomsCollection.update(
      { _id: roomId },
      { $set: { player1Id: null } }
    );
  },

  "player2Leave"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    RoomsCollection.update(
      { _id: roomId },
      { $set: { player2Id: null } }
    );
  },
});
