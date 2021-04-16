import { Mongo } from 'meteor/mongo';
import { Meteor } from "meteor/meteor";

export const FormsCollection = new Mongo.Collection('forms');

if (Meteor.isServer) {
    Meteor.publish("forms", function publishForms() {
        const user = Meteor.users.findOne({ _id: this.userId });
        if (user.isActive) return FormsCollection.find({});
        return [];
    });
}
