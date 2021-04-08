import { Meteor } from 'meteor/meteor';
import { ClientsCollection } from '/imports/db/ClientsCollection';

Meteor.publish('clients', function publishTasks() {
  return ClientsCollection.find();
});