import { Mongo } from 'meteor/mongo';
import { Meteor } from "meteor/meteor";

export const FormsCollection = new Mongo.Collection('forms');

if (Meteor.isServer) {
    Meteor.publish("forms", function publishForms() {
        console.log("in forms subscription");
        const user = Meteor.users.findOne({ _id: this.userId });
        if (user.isActive) return FormsCollection.find({});
        return [];
    });
}
