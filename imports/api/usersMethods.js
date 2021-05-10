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
    },
    'users.update'(fName,lName,password){
        const user = Meteor.user();
        console.log("USER", user);
        Accounts.setPassword(user._id, password, {logout:false});
        Accounts.update(Session.get(fName)), {
            $set: { fName }
        }
        Accounts.update(Session.get(lName)), {
            $set: { lName }
        } 
    }
});