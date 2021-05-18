import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    // unprotected
    'users.register': function (fname, lname, username, password) {
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
                fname,
                lname,
                username,
                password,
                isActive: false,
            });
        } else {
            throw new Meteor.Error(`User ${username} already exists`);
        }
    },
    // requires auth and god power
    'users.insert': function (user) {
        // if allowed
        if (false) {

        }
    },
    'users.update': function (fName, lName, password) {
        const user = Meteor.user();
        console.log("USER", user);
        Accounts.setPassword(user._id, password, { logout: false });
        Meteor.users.update({ _id: user._id }, {
            $set: { fname: fName },
        });
        Meteor.users.update({ _id: user._id }, {
            $set: { lname: lName },
        });
    },
    'users.remove': function (_id) {
        const user = Meteor.user();
        if (_id !== user._id && user.isAdmin) {
            Meteor.users.remove({ _id });
        } else {
            throw new Meteor.Error("Cannot delete this user");
        }
    },
    // 'users.set'(_id, set){
    //     //must be same user
    //     if(this.userId == _id){
    //         var filteredSet = {};
    //         //only allow normal user to update these four attributes
    //         (['username', 'fname', 'lname']).forEach((key) => {
    //             if(set[key] !== undefined){
    //                 filteredSet[key] = set[key];
    //             }
    //         });
    //         Meteor.users.update({_id: _id}, {
    //             $set: filteredSet
    //         } );
    //         if(set[password]){
    //             Accounts.setPassword(user._id, password, {logout:false});
    //         }
    //     } else {
    //         throw new Meteor.Error('You must be signed in as this user to update their account');
    //     }
    // },
    'users.setPrivileged': function (_id, set) {
        const user = Meteor.users.findOne({ _id: this.userId });
        if (_id === Meteor.userId()) {
            throw new Meteor.Error("You cannot edit your own permissions");
        } else if (user.isAdmin) {
            console.log("admin check success");
            Meteor.users.update({ _id }, {
                $set: set,
            });
        } else {
            throw new Meteor.Error('Only Admin users can call setPrivileged');
        }
    },
});
