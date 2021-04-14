import { Mongo } from 'meteor/mongo';
import { FormFilesCollection } from "/imports/db/FormFilesCollection";
import {Meteor} from "meteor/meteor";

export const ClientsCollection = new Mongo.Collection('clients');

if (Meteor.isServer) {
    // This listens for events in the collection
    ClientsCollection.find({}).observe({
        removed: (oldDoc) => { // When an item was removed, delete the associated pictures
            FormFilesCollection.remove({ meta: { clientid: oldDoc._id } });
        },
    });

    Meteor.publish('clients', function publishTasks() {
        const user = Meteor.users.findOne({ _id: this.userId });
        console.log("USER", user);
        if (user && user.isActive) return ClientsCollection.find({});
        return [];
    });
}
