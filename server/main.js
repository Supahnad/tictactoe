import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import { RoomsCollection } from '../imports/db/RoomsCollection';
import '/imports/api/roomMethods';
import '/imports/api/roomPublication';

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



