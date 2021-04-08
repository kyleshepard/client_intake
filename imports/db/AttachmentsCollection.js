import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

// https://github.com/VeliovGroup/Meteor-Files/wiki

const attachmentsCollectionName = 'files';
export const AttachmentsCollection = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: true, // Allow remove files from Client
    onBeforeUpload(file) {
        // Allow any upload. TODO: research if this is risky
        return true;
    },
});

if (Meteor.isClient) {
    Meteor.subscribe(attachmentsCollectionName);
}

if (Meteor.isServer) {
    Meteor.publish(attachmentsCollectionName, () => AttachmentsCollection.find().cursor);
}
