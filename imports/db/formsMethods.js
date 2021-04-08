import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FormsCollection } from "/imports/api/FormsCollection";

Meteor.methods({
    'forms.insert'(form){
        FormsCollection.insert(form);
    },
    'forms.remove'(form){
        FormsCollection.remove(form);
    }
});