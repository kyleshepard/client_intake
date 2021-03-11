import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

// https://github.com/VeliovGroup/Meteor-Files/wiki

const imageCollectionName = 'images';
export const ImagesCollection = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: true, // Allow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    },
});

if (Meteor.isClient) {
    Meteor.subscribe(imageCollectionName);
}

if (Meteor.isServer) {
    Meteor.publish(imageCollectionName, () => ImagesCollection.find().cursor);
}
