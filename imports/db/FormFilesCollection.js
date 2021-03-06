import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

// https://github.com/VeliovGroup/Meteor-Files/wiki

export const imageCollectionName = 'images';
export const FormFilesCollection = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: true, // Allow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB
        if (file.size <= 10485760) { // TODO: Idk if we need this
            return true;
        }
        return 'Please upload file with size equal or less than 10MB';
    },
});

if (Meteor.isServer) {
    Meteor.publish(imageCollectionName, () => {
        const user = Meteor.user();
        if (user && user.isActive) return FormFilesCollection.find({}).cursor;
        throw new Meteor.Error("Non-active user");
    });
}
