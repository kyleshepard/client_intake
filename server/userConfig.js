import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.config({
    forbidClientAccountCreation: true
});

Accounts.onCreateUser((options, user) => {
    user.fname = options.fname;
    user.lname = options.lname;
    user.isActive = options.isActive;
    user.isAdmin = options.isAdmin;
    return user;
});

//for administrative user managment, meaning activation of registered accounts
Meteor.publish("users", function publishForms() {
    const user = Meteor.users.findOne({ _id: this.userId });
    if (user.isActive && user.isAdmin){
        return Meteor.users.find({}, { fields: { services: 0 }}); //do not include password and login token data, doesn't matter if the user is an admin
    }
    return [];
});

Meteor.publish("user", function publishForms() {
    return Meteor.users.find({ _id: this.userId }, { fields: { services: 0 }});
});

//should keep users from editing fields on client side
Meteor.users.deny({ update: () => true, insert: () => true, remove: () => true });
// Meteor.users.allow({ update: () => true, insert: () => true, remove: () => true });
