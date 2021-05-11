import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FormsCollection } from "/imports/db/FormsCollection";

Meteor.methods({
    'forms.insert': function (form) {
        FormsCollection.insert(form);
    },
    'forms.remove': function (form) {
        FormsCollection.remove(form);
    },
    'forms.update': function (...args) {
        FormsCollection.update(...args);
    },
});
