import { Meteor } from 'meteor/meteor';
<<<<<<< HEAD
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });

Meteor.startup(() => {
    // If the Links collection is empty, add some data.
    if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
=======
import { Accounts } from 'meteor/accounts-base';
import { ClientsCollection } from "../imports/api/ClientsCollection";
import { ImagesCollection } from "../imports/api/ImagesCollection";

const insertClient = (taskText) => ClientsCollection.insert({ text: taskText });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
    console.log(ImagesCollection);
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }
>>>>>>> cd58cdc3b4560beacac4fde24f98443e81e35d4c
});
