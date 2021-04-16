import { Mongo } from 'meteor/mongo';
import { Meteor } from "meteor/meteor";

export const UsersCollection = Meteor.users;

if (Meteor.isServer) {
    Meteor.publish("users", function publishForms() {
        console.log("in users collection");
        const user = Meteor.users.findOne({ _id: this.userId });
        if (user.isActive && user.isAdmin) return UsersCollection.find({});
        return [];
    });
}
