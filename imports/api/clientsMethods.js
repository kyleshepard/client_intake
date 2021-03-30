import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ClientsCollection } from "./ClientsCollection";

Meteor.methods({
    'clients.insert'(client){
        client['createdAt'] = Date();
        client['modifiedAt'] = Date();
        client['modifiedBy'] = Meteor.user()._id;
        ClientsCollection.insert(client);
    },
    //why use this when you could not? directly calling update w/o $set will delete other attributes in the document not set
    'clients.update'(_id, update){
        if(!update['$set']){
            update['$set'] = {};
        }
        update['$set']['modifiedAt'] = Date();
        update['$set']['modifiedBy'] = Meteor.user()._id;
        ClientsCollection.update({_id: _id}, update);
    },
    'clients.set'(_id, set){
        
        set['modifiedAt'] = Date();
        set['modifiedBy'] = Meteor.user()._id;
        ClientsCollection.update({_id: _id}, {
            $set: set
        } );
    },
    'clients.remove'(_id){
        ClientsCollection.remove(_id);
    }
});