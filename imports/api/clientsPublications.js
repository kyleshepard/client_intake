import { Meteor } from 'meteor/meteor';
import { ClientsCollection } from '/imports/db/ClientsCollection';

Meteor.publish('clients', function publishTasks() {
    const user = Meteor.users.findOne({ _id: this.userId });
    console.log("USER", user);
    if (user && user.isActive) return ClientsCollection.find({});
    return [];
});
