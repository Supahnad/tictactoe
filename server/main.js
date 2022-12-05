import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import { RoomsCollection } from '../imports/api/db/RoomsCollection';

const insertRoom = (roomName, room) =>
  TasksCollection.insert({
    roomId: room._id,
    name: roomName,
    createdAt: new Date(),
  });

const SEED_USERNAME = "adminacc";
const SEED_PASSWORD = "admin";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});



