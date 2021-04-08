import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { AttachmentsCollection } from "/imports/api//AttachmentsCollection";

Meteor.methods({
    'attachments.insert'(attachment){
        AttachmentsCollection.insert(attachment);
    },
    'attachments.remove'(_id){
        AttachmentsCollection.remove(_id);
    }
});