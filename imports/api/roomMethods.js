import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { RoomsCollection } from "../db/RoomsCollection";

Meteor.methods({
  "createRoom"(name, username) {
    check(name, String);
    check(username, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const roomId = RoomsCollection.insert({
      name,
      createdAt: new Date(),
      player1Id: this.userId,
      player1Username: username,
      player2Id: null,
      player2Username: null,
      squares: new Array(9).fill(null),
      turn: this.userId,
      xScore: 0,
      oScore: 0,
      rematch: 0,
      winner: false,
      draw: false,
      move: "x",
    });

    return roomId;
  },

  "insert.player"(roomId, username) {
    check(roomId, String);

    if (!this.userId) {
      return {
        status: "error",
        message: "User not logged in",
      };
    } else {
      const room = RoomsCollection.findOne({ _id: roomId });
      const { player1Id, player2Id } = room;
      const isRoomCreator = player1Id === this.userId;
      const isChallenger = player2Id === this.userId;
      const isNotChallenger = player2Id !== this.userId;
      if (isRoomCreator || isChallenger) {
        // If user is already player 1 or player 2
        return {
          status: "success",
        };
      } else {
        if (!player2Id) {
          // Join room if no player 2 yet
          RoomsCollection.update(
            { _id: roomId },
            { $set: { player2Id: this.userId, player2Username: username } }
          );
          return {
            status: "success",
          };
        } else {
          return {
            status: "error",
            message: "Room is full",
          };
        }
      }
    }
  },

  "place.move"(roomId, Index, square) {
    check(roomId, String);
    check(Index, Number);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const room = RoomsCollection.findOne({ _id: roomId });
    const isPlayerTurn = room.turn === this.userId;
    const changePlayer =
      room.turn === room.player1Id ? room.player2Id : room.player1Id;
    const letter = room.turn === room.player1Id ? "x" : "o";

    // let patterns = [
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];

    // const boxFull = room.squares.every((square) => {
    //   if (square !== null) {
    //     return square;
    //   }
    // });

    if (isPlayerTurn) {
      if (room.squares[Index] === null) {
        RoomsCollection.update(
          { _id: roomId },
          {
            $set: {
              ["squares." + Index]: letter,
              turn: changePlayer,
            },
          }
        );
        // for (let i = 0; i < patterns.length; i++) {
        //   const [a, b, c] = patterns[i];
        //   if (
        //     square[a] &&
        //     square[a] === square[b] &&
        //     square[b] === square[c] &&
        //     !boxFull
        //   ) {
        //     if (square[a] === "x") {
        //       RoomsCollection.update(
        //         { _id: roomId },
        //         {
        //           $set: {
        //             winner: true,
        //           },
        //         }
        //       );
        //       return {
        //         status: "success",
        //         winner: "player 1 wins",
        //       };
        //     } else if (square[a] === "o") {
        //       RoomsCollection.update(
        //         { _id: roomId },
        //         {
        //           $set: {
        //             winner: true,
        //           },
        //         }
        //       );
        //       return {
        //         status: "success",
        //         winner: "player 2 wins",
        //       };
        //     }
        //   }
        // }

        return {
          status: "success",
          response: room.squares,
        };
      } else {
        return {
          status: "error",
          message: "the square already have a value",
        };
      }
    } else {
      return {
        status: "error",
        message: "its not your turn",
      };
    }
  },

  "deleteRoom"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    RoomsCollection.remove(roomId);
  },

  "player2Leave"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    RoomsCollection.update({ _id: roomId }, { $set: { player2Id: null } });
  },

  "set.Score"(roomId, score, winner) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const room = RoomsCollection.findOne({ _id: roomId });

    if (winner === room.player1Username) {
      RoomsCollection.update(
        { _id: roomId },
        {
          $set: {
            xScore: score,
            squares: new Array(9).fill(null),
            winner: true,
          },
        }
      );
    } else if (winner === room.player2Username) {
      RoomsCollection.update(
        { _id: roomId },
        {
          $set: {
            oScore: score,
            squares: new Array(9).fill(null),
            winner: true,
          },
        }
      );
    }
  },
  "game.Draw"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const room = RoomsCollection.findOne({ _id: roomId });

  RoomsCollection.update(
        { _id: roomId },
        {
          $set: {
            squares: new Array(9).fill(null),
            draw: true,
          },
        }
      );
  },

  "reset.Game"(roomId) {
    check(roomId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const room = RoomsCollection.findOne({ _id: roomId });

    if (room.rematch !== 1) {
      RoomsCollection.update(
        { _id: roomId },
        {
          $inc: {
            rematch: 1,
          },
        }
      );
      return {
        status: "error",
        message: "waiting for other player",
        response: room.rematch,
      };
    } else if(room.rematch === 1) {
      RoomsCollection.update(
        { _id: roomId },
        {
          $set: {
            squares: new Array(9).fill(null),
            winner: false,
            draw: false,
            rematch: 0,
            turn: room.player1Id,
          },
        }
      );
      return {
        status: "success",
        response: room.winner,
      };
    }
  },
});
