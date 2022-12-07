import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { RoomsCollection } from '../db/RoomsCollection';

Meteor.methods({
    'createRoom'(name) {
      check(name, String);
  
      if (!this.userId) {
        throw new Meteor.Error('Not authorized.');
      }
  
      RoomsCollection.insert({
        name,
        createdAt: new Date,
        player1Id: this.userId,
      })
    },

    'insert.player2'(roomId) {
      check(roomId, String);
  
      if (!this.userId) {
        throw new Meteor.Error("Not authorized.");
      }
  
      RoomsCollection.update(roomId, { $set: { player2id } });
    },
  });