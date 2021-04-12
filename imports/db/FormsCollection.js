import { Mongo } from 'meteor/mongo';

export const FormsCollection = new Mongo.Collection('forms');

if (Meteor.isServer) {
    // This listens for events in the collection
    // Forms.find({}).observe({
    //
    // });
    Meteor.publish("Forms", () => FormsCollection.find({}));
}
