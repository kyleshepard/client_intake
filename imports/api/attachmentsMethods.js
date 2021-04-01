import { Meteor } from 'meteor/meteor';
import { AttachmentsCollection } from "./AttachmentsCollection";

Meteor.methods({
    'attachments.insert': (attachment) => {
        AttachmentsCollection.insert(attachment);
    },
    'attachments.remove': (_id) => {
        AttachmentsCollection.remove(_id);
    },
});
