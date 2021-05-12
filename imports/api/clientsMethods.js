import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ClientsCollection } from "/imports/db/ClientsCollection";

Meteor.methods({
    'clients.insert': function (client) {
        client.createdAt = Date();
        client.modifiedAt = Date();
        client.modifiedBy = Meteor.user()._id;
        ClientsCollection.insert(client);
    },
    // why use this when you could not? directly calling update w/o $set will delete other attributes in the document not set
    'clients.update': function (_id, update) {
        if (!update.$set) {
            update.$set = {};
        }
        update.$set.modifiedAt = Date();
        update.$set.modifiedBy = Meteor.user()._id;
        ClientsCollection.update({ _id }, update);
    },
    'clients.set': function (_id, set) {
        set.modifiedAt = Date();
        set.modifiedBy = Meteor.user()._id;
        ClientsCollection.update({ _id }, {
            $set: set,
        }, (...res) => console.log("FINISHED", _id, set, res));
    },
    'clients.remove': function (_id) {
        ClientsCollection.remove(_id);
    },
});
