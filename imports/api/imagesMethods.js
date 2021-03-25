import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ImagesCollection } from "./ImagesCollection";

Meteor.methods({
    'images.insert'(image){
        ClientsCollection.insert(client);
    },
    'images.remove'(_id){
        ImagesCollection.remove(_id);
    }
});