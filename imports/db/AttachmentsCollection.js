import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

// https://github.com/VeliovGroup/Meteor-Files/wiki

const attachmentsCollectionName = 'files';
export const AttachmentsCollection = new FilesCollection({
    collectionName: 'files',
    allowClientCode: true, // Allow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 16MB,
        const megabyte = 2 ** 20;
        if (file.size <= 32 * megabyte) {
            return true;
        }
        return false;
    },
});

if (Meteor.isServer) {
    // Deny all client-side updates on the Lists collection
    AttachmentsCollection.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; },
    });
    Meteor.publish(attachmentsCollectionName, () => {
        const user = Meteor.users.findOne({ _id: this.userId });
        if (user.isActive) return AttachmentsCollection.find();
        return [];
    });
}
