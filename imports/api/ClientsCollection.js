import { Mongo } from 'meteor/mongo';
import { ImagesCollection } from "./ImagesCollection";

export const ClientsCollection = new Mongo.Collection('clients');

if (Meteor.isServer) {
    // This listens for events in the collection
    ClientsCollection.find({}).observe({
        removed: (oldDoc) => { // When an item was removed, delete the associated pictures
            ImagesCollection.remove({ meta: { clientid: oldDoc._id } });
        },
    });
}
