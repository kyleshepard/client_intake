import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
// import { Users } from '/imports/api/UsersCollection';

Accounts.onCreateUser((options, user) => {
    user.fname = options.fname;
    user.lname = options.lname;
    user.isActive = options.isActive;
    return user;
});
// Accounts.onCreateUser((options, user) => {
//     user.fname = options.fname;
//     user.lname = options.lname;
//     user.isActive = options.isActive;
//     return user;
// });

// Meteor.users.deny({
//     update() { console.log("\n\n\n\ndeny update\n\n\n\n"); return true; },
//     insert() { console.log("\n\n\n\deny insert\n\n\n\n"); return true; },
//     remove() { return true; }
// });

Meteor.users.deny({
    update() { console.log("\n\n\n\ndeny update\n\n\n\n"); return true; }
});

Meteor.users.deny({
    insert() { console.log("\n\n\n\deny insert\n\n\n\n"); return true; }
});