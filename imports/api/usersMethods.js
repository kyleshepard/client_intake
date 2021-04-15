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
    'users.set'(set){
        // Accounts.update?
    }
});