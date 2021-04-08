import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.config({
    forbidClientAccountCreation: true
});

Accounts.onCreateUser((options, user) => {
    user.fname = options.fname;
    user.lname = options.lname;
    user.isActive = options.isActive;
    return user;
});

Meteor.users.deny({ update: () => true, insert: () => true, remove: () => true });