import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
    //unprotected
    'users.register'(fname, lname, username, password){
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
                fname: fname,
                lname: lname,
                username: username,
                password: password,
                isActive: false
            });
        } else {
            throw new Meteor.Error(`User ${username} already exists`);
        }
    },
    //requires auth and god power
    'users.insert'(user){
        //if allowed
        if(false){

        }
    },
    'users.set'(_id, set){
        //must be same user
        if(this.userId == _id){
            var filteredSet = {};
            //only allow normal user to update these four attributes
            (['username', 'fname', 'lname', 'password']).forEach((key) => {
                if(set[key] !== undefined){
                    filteredSet[key] = set[key];
                }
            });
            Meteor.users.update({_id: _id}, {
                $set: filteredSet
            } );
        } else {
            throw new Meteor.Error('You must be signed in as this user to update their account');
        }
    },
    'users.setPrivileged'(_id, set){
        const user = Meteor.users.findOne({ _id: this.userId });
        if (user.isAdmin) {
            console.log("admin check success");
            Meteor.users.update({_id: _id}, {
                $set: set
            } );
        } else {
            throw new Meteor.Error('Only Admin users can call setPrivileged');
        }
    },
});
