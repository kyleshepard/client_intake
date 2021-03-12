import { Mongo } from 'meteor/mongo';
import { ImagesCollection } from "./ImagesCollection";

export const TasksCollection = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    // This listens for events in the collection
    TasksCollection.find({}).observe({
        removed: (oldDoc) => { // When an item was removed, delete the associated pictures
            ImagesCollection.remove({ meta: { clientid: oldDoc._id } });
        },
    });
}
