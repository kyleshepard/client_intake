import { Meteor } from 'meteor/meteor';
import { FormsCollection } from "../db/FormsCollection";

Meteor.methods({
    'forms.insert': function (form) {
        const user = Meteor.user();
        if (user && user.isAdmin) FormsCollection.insert(form);
    },
    'forms.remove': function (form) {
        const user = Meteor.user();
        if (user && user.isAdmin) FormsCollection.remove(form);
    },
    'forms.update': function (...args) {
        const user = Meteor.user();
        if (user && user.isAdmin) FormsCollection.update(...args);
    },
});
