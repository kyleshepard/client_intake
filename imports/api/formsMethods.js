import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FormsCollection } from "/imports/db/FormsCollection";

Meteor.methods({
    'forms.insert'(form){
        FormsCollection.insert(form);
    },
    'forms.remove'(form){
        FormsCollection.remove(form);
    },
    'forms.update'(...args){
        FormsCollection.update(...args);
    }
});